export interface IUserInterface {
    name: string;
    id: string;
    email: string;
    password: string;
    address: IAddressInterface;
    mobileNumber: string;
    totalAmount: string;
    role: 'USER' | 'ADMIN';
}

export interface IAddressInterface {
    address1: string;
    address2: string;
    adress3?: string;
    country: string;
    postalCode: string;
    city: string;
}

export interface ITransactionInterface {
    transactionType: 'CREDIT' | 'DEBIT';
    transactionId?: string;
    amount: string;
    userId: string;
}

export interface ICashUpdate {
    id: string;
    cash: Record<string, string>;
    totalAmount: string;
}

export type TWithouthPassword = Omit<IUserInterface, 'password'>;
