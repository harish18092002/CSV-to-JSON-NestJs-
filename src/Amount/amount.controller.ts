import { Body, Controller, Get, Post } from '@nestjs/common';
import { AmountService } from './amount.service';
import { ICashUpdate, ITransactionInterface } from 'src/interface';

@Controller()
export class AmountController {
    constructor(private readonly amountService: AmountService) {}

    // for credting the amount
    @Post('credit')
    creditAmount(
        @Body()
        creditData: ITransactionInterface,
    ) {
        return this.amountService.creditAmount(creditData);
    }
    // For debiting the amount
    @Post('debit')
    debitAmount(
        @Body()
        debitAmount: ITransactionInterface,
    ) {
        return this.amountService.debitAmount(debitAmount);
    }
    // for cash filling
    @Post('cash/update')
    cashUpdate(
        @Body()
        cashUpdate: ICashUpdate,
    ) {
        return this.amountService.cashUpdate(cashUpdate);
    }

    @Get('getCash')
    getCash(
        @Body()
        getcash: ICashUpdate,
    ) {
        return this.amountService.getCash(getcash);
    }

    @Post('transactionDetials')
    transactionDetails(
        @Body()
        body: {
            userId: string;
            pageNo: number;
        },
    ) {
        return this.amountService.getTransaction(body);
    }
}
