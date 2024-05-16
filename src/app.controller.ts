import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { IUserInterface } from './interface';
import { createUserValidator } from './validators';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post('create')
    getdata(@Body() postdata: IUserInterface) {
        try {
            createUserValidator(postdata);
            return this.appService.create(postdata);
        } catch (error) {
            return { status: 'ERROR', Data: null, message: error.message };
        }
    }
    @Post('authenticate')
    async authenticate(
        @Body() body: { id?: string; email?: string; password: string },
    ) {
        return this.appService.getData(body);
    }

    @Post('get/all')
    async getAll(
        @Body()
        body: {
            email: string;
            password: string;
            role: 'USER' | 'ADMIN';
        },
    ) {
        return this.appService.getAllData(body);
    }

    @Post('delete')
    deleteData(
        @Body()
        body: {
            email: string;
            address: string;
        },
    ) {
        return this.appService.delete(body);
    }
}
