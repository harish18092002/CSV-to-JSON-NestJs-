import { generateID } from '@jetit/id';
import { Injectable, Logger } from '@nestjs/common';
import { Amount, User } from '@prisma/client';
import { AppService } from 'src/app.service';
import { ICashUpdate, ITransactionInterface } from 'src/interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { TResponse } from 'src/type';
import { calculateNotesNeeded, parseCashValues } from './utils';

@Injectable()
export class AmountService {
    private logger: Logger;
    constructor(
        private prisma: PrismaService,
        private appService: AppService,
    ) {
        this.logger = new Logger('AMOUNT SERVICE');
    }
    // for crediting amount

    async creditAmount(data: ITransactionInterface): Promise<TResponse<User>> {
        try {
            const finduser = await this.prisma.prismaClient.user.findFirst({
                where: {
                    id: data.userId,
                },
            });

            if (!finduser) {
                return {
                    status: 'ERRROR',
                    message:
                        'Create a user account to continue the credit process',
                    data: null,
                };
            }

            if (data.transactionType === 'CREDIT') {
                const createUser =
                    await this.prisma.prismaClient.transaction.create({
                        data: {
                            transactionId: generateID('HEX'),
                            amount: data.amount,
                            transactionType: 'CREDIT',
                            userId: data.userId,
                        },
                    });
                const transactionAmount = parseInt(finduser.totalAmount);
                const newAmount = parseInt(data.amount);
                const total = await this.prisma.prismaClient.user.update({
                    where: {
                        id: data.userId,
                    },
                    data: {
                        totalAmount: (transactionAmount + newAmount).toString(),
                    },
                });
                return {
                    status: 'SUCCESS',
                    message: 'The amount credited and updated successfully',
                    data: null,
                };
            }
        } catch (error) {
            return { status: 'ERRROR', message: error.message, data: null };
        }
    }

    // for debiting amount

    async debitAmount(data: ITransactionInterface): Promise<TResponse<User>> {
        try {
            // Get cash details
            const atmCash = await this.prisma.prismaClient.amount.findFirst({
                where: {
                    id: '82390cd61070680f',
                },
            });
            const user = await this.prisma.prismaClient.user.findUnique({
                where: {
                    id: data.userId,
                },
            });

            if (!atmCash && !user) {
                throw new Error('ATM cash data or user not found.');
            }

            // Parse cash values from string to number

            const parsedCash = parseCashValues(
                atmCash.cash as Record<string, string>,
            );

            const transactionAmount = parseInt(data.amount);
            if (transactionAmount <= 0) {
                throw new Error('Invalid transaction amount.');
            }

            const notesNeeded = calculateNotesNeeded(
                transactionAmount,
                parsedCash,
            );

            const totalAmount = parseInt(user.totalAmount) - transactionAmount;
            if (totalAmount <= -1) {
                throw new Error('Insufficient balance in your vallet');
            } else {
                const updatedUser = await this.prisma.prismaClient.user.update({
                    where: { id: data.userId },
                    data: { totalAmount: totalAmount.toString() },
                });
                const createTransaction =
                    await this.prisma.prismaClient.transaction.create({
                        data: {
                            transactionId: generateID('HEX'),
                            userId: data.userId,
                            transactionType: 'DEBIT',
                            amount: transactionAmount.toString(),
                        },
                    });
            }

            // Update ATM cash count by deducting the notes needed
            const updatedCash = {
                '2000': (parsedCash['2000'] - notesNeeded['2000']).toString(),
                '1000': (parsedCash['1000'] - notesNeeded['1000']).toString(),
                '500': (parsedCash['500'] - notesNeeded['500']).toString(),
                '100': (parsedCash['100'] - notesNeeded['100']).toString(),
            };
            const cashDetails = {
                '2000': notesNeeded['2000'],
                '1000': notesNeeded['1000'],
                '500': notesNeeded['500'],
                '100': notesNeeded['100'],
            };

            const atmAmount = parseInt(atmCash.totalAmount);
            const userAmount = parseInt(data.amount);
            const updatedAtm = atmAmount - userAmount;
            const updatedAtmCash = await this.prisma.prismaClient.amount.update(
                {
                    where: { id: atmCash.id },
                    data: {
                        cash: updatedCash,
                        totalAmount: updatedAtm.toString(),
                    },
                },
            );

            return {
                status: 'SUCCESS',
                message: 'The amount debited and below are the cash details',
                data: cashDetails,
            };
        } catch (error) {
            return {
                status: 'ERRROR',
                message: error.message,
                data: null,
            };
        }
    }

    // cash filling occurs here
    async cashUpdate(cashUpdate: ICashUpdate): Promise<TResponse<User>> {
        try {
            const cash = await this.prisma.prismaClient.amount.update({
                where: {
                    id: cashUpdate.id,
                },
                data: {
                    totalAmount: cashUpdate.totalAmount,
                    cash: cashUpdate.cash,
                },
            });
            return {
                status: 'SUCCESS',
                message: 'Amount updated Successfully',
                data: null,
            };
        } catch (error) {
            this.logger.error(error);
            return {
                status: 'ERRROR',
                message: 'Error occured during updating the amount',
                data: null,
            };
        }
    }
    // get atm details
    async getCash(getCash: ICashUpdate): Promise<TResponse<Amount>> {
        try {
            const getcash = await this.prisma.prismaClient.amount.findFirst({
                where: {
                    id: getCash.id,
                },
            });

            return {
                status: 'SUCCESS',
                message: null,
                data: null,
            };
        } catch (error) {
            return {
                status: 'ERRROR',
                message: null,
                data: null,
            };
        }
    }

    // get all transaction from specific id

    async getTransaction(data: { userId: string; pageNo: number }) {
        try {
            const transaction =
                await this.prisma.prismaClient.transaction.findMany({
                    take: 5,
                    skip: 5 * (data.pageNo - 1),

                    where: {
                        userId: data.userId,
                    },
                });

            return {
                status: 'SUCCESS',
                message: 'Transaction details fetched successfuly',
                data: transaction,
            };
        } catch (error) {
            return {
                status: 'ERRROR',
                message: 'Incorrect transaction id',
                data: null,
            };
        }
    }
}
