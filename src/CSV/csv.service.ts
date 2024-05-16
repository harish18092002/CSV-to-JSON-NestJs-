import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import {
    initializeApp,
    cert,
    ServiceAccount,
    deleteApp,
} from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { TResponse } from 'src/type';
import { firebaseCredentials } from './config';

@Injectable()
export class CsvService {
    constructor() {}

    async parseData(url: string): Promise<TResponse<User>> {
        const _app = initializeApp({
            credential: cert(firebaseCredentials as ServiceAccount),
            storageBucket: 'nestjs-parsecsv.appspot.com',
        });
        try {
            const bucket = getStorage().bucket().file('add.csv');
            const fireData = Buffer.from(...(await bucket.download())).toString(
                'utf8',
            );
            const regex = /_/i;
            const str = 'harish_18';
            console.log(str.replace(regex, '09'));

            const csvToSnakeCase = (str: string) => {
                if (!str) return '';
                return str
                    .split('_')
                    .map((word, index) => {
                        if (index === 0) return word.toLowerCase();
                        return word.charAt(0).toUpperCase() + word.slice(1);
                    })
                    .join('');
            };

            const json = [];
            const rows = fireData.split('\n');
            const headers = rows[0].split(',');
            // console.log('This is the rows ' + rows);
            console.log('This is the headers ' + headers);

            for (let i = 1; i < rows.length; i++) {
                const row = {};

                const cells = rows[i].split(',');

                for (let j = 1; j < cells.length; j++) {
                    // if (cells[j] != '') {
                    const header = csvToSnakeCase(headers[j]);
                    row[header] = cells[j];

                    // row[headers[j]] = cells[j];
                    // }
                }
                json.push(row);
            }
            await deleteApp(_app);

            return {
                message: 'Fetched',
                data: json,
                status: 'SUCCESS',
            };
        } catch (error) {
            return {
                message: 'Data has not fetched ',
                data: null,
                status: 'ERRROR',
            };
        }
    }
}
