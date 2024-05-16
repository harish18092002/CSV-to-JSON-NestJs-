import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';
import { generateID } from '@jetit/id';
import { Logger } from '@nestjs/common';
import { TResponse } from './type';
import { IUserInterface, TWithouthPassword } from './interface';

@Injectable()
export class AppService {
    private logger: Logger;
    constructor(private prisma: PrismaService) {
        this.logger = new Logger();
    }

    async create(userData: IUserInterface): Promise<TResponse<User>> {
        try {
            userData.id = generateID('HEX');

            // Hash password

            const hash = await argon2.hash(userData.password);
            const userAdmin = await this.prisma.prismaClient.user.findFirst({
                where: {
                    role: 'ADMIN',
                },
            });

            if (userAdmin !== null && userData.role !== 'USER') {
                // Create user
                throw new Error(
                    'Admin already exists login with admin credentials',
                );
            } else {
                const user = await this.prisma.prismaClient.user.create({
                    data: {
                        ...userData,
                        password: hash,
                        address: {
                            create: userData.address,
                        },
                    },
                });
                this.logger.log('Account created in create function ');

                return {
                    status: 'SUCCESS',
                    data: userData,
                    message: 'created ',
                };
            }
        } catch (error) {
            this.logger.error(error);
            return { status: 'ERRROR', message: error.message, data: null };
        }
    }
    // for getting a particular user
    async getData(user: {
        id?: string;
        email?: string;
        password: string;
    }): Promise<TResponse<User>> {
        try {
            const userDetails = await this.prisma.prismaClient.user.findFirst({
                where: {
                    OR: [{ id: user.id }, { email: user.email }],
                },
            });
            if (await argon2.verify(userDetails.password, user.password)) {
                this.logger.log('Password verified successfully ');
            } else {
                throw new Error('Password mismatch error');
            }

            return {
                status: 'SUCCESS',
                message: 'Data fetched',
                data: userDetails,
            };
        } catch (error) {
            this.logger.error(error);
            return { status: 'ERRROR', message: error.message, data: null };
        }
    }

    // for getting all user data in db

    async getAllData(user: {
        email: string;
        password: string;
        role: 'USER' | 'ADMIN';
    }): Promise<TResponse<Array<TWithouthPassword>>> {
        try {
            const userDetails = await this.prisma.prismaClient.user.findFirst({
                where: {
                    email: user.email,
                    role: 'ADMIN',
                },
            });

            const dbData = await argon2.verify(
                userDetails.password,
                user.password,
            );
            if (dbData) {
                const allUserData =
                    await this.prisma.prismaClient.user.findMany({
                        select: {
                            email: true,
                            id: true,
                            address: true,
                            mobileNumber: true,
                            name: true,
                            totalAmount: true,
                            role: true,
                        },
                    });
                this.logger.log('All data fetched');

                return {
                    status: 'SUCCESS',
                    message: 'All data fetched',
                    data: allUserData,
                };
                this.logger.log('Account created in create function ');
            } else {
                throw new Error('Enter the correct admin credentials');
            }
        } catch (error) {
            this.logger.error(error);
            return { status: 'ERRROR', message: error.message, data: null };
        }
    }
    // for deleting a particular user

    async delete(users: {
        email: string;
        address: string;
    }): Promise<TResponse<User>> {
        try {
            const user = await this.prisma.prismaClient.user.findFirst({
                where: {
                    email: users.email,
                },
            });

            const userTable = await this.prisma.prismaClient.$transaction([
                this.prisma.prismaClient.address.delete({
                    where: {
                        id: user.id,
                    },
                }),
                this.prisma.prismaClient.user.deleteMany({
                    where: { id: user.id },
                }),
            ]);

            return {
                status: 'SUCCESS',
                message: 'Deleted successfully',
                data: null,
            };
        } catch (error) {
            this.logger.error(error);
            return { status: 'ERRROR', message: error.message, data: null };
        }
    }
}

// function csvToJson(csvData: string): any[] {
//     const json = [];
//     const rows = csvData.split('\n');
//     const headers = rows[0].split(',');
//     for (let i = 1; i < rows.length; i++) {
//         const row = {};
//         const cells = rows[i].split(',');
//         for (let j = 0; j < cells.length; j++) {
//             row[headers[j]] = cells[j];
//         }
//         json.push(row);
//     }
//     return json;
// }

// async parseCsvToJson(csvData: string): Promise<any[]> {
//     const rows = csvData.split('\r'); // Split by carriage return '\r'
//     const headers = rows[0].split(',');
//     const jsonData = [];

//     for (let i = 1; i < rows.length; i++) {
//       const values = rows[i].split(',');
//       const obj = {};

//       for (let j = 0; j < headers.length; j++) {
//         obj[headers[j]] = values[j];
//       }

//       jsonData.push(obj);
//     }

//     return jsonData;
// }

// const csvData = 'name,age,country\nJohn,25,USA\nJane,30,Canada\nBob,35,Mexico';
// const json = csvToJson(csvData);
// console.log(json)

// async parseCsvToJson(csvData: string): Promise<any[]> {
//     const rows = csvData.split('\n').filter(row => row.trim() !== ''); // Split by newline '\n' and filter out empty rows
//     const headers = rows[0].split(',');
//     const jsonData = [];

//     for (let i = 1; i < rows.length; i++) {
//       const values = rows[i].split(',');
//       const obj = {};

//       for (let j = 0; j < headers.length; j++) {
//         obj[headers[j]] = values[j];
//       }

//       jsonData.push(obj);
//     }

//     return jsonData;
// }
// ;
