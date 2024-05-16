export type TResponse<T> = {
    data: any;
    status: 'SUCCESS' | 'ERRROR';
    message: string;
};
