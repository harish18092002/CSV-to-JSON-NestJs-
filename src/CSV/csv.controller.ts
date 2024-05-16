import { Body, Controller, Get } from '@nestjs/common';
import { CsvService } from './csv.service';
import { url } from 'inspector';

@Controller()
export class CsvController {
    constructor(private readonly csvService: CsvService) {}
    @Get('parseData')
    async parseData(
        @Body()
        url: string,
    ) {
        return this.csvService.parseData(url);
    }
}
