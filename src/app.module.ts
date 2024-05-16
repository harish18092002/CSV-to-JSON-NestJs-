import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AppService } from './app.service';
import { AmountService } from './Amount/amount.service';
import { AmountController } from './Amount/amount.controller';
import { CsvController } from './CSV/csv.controller';
import { CsvService } from './CSV/csv.service';

@Module({
    imports: [PrismaModule],
    controllers: [AppController, AmountController, CsvController],
    providers: [AppService, PrismaService, AmountService, CsvService],
})
export class AppModule {}
