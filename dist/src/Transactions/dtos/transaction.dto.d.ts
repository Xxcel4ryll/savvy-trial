import * as Joi from 'joi';
export declare class TransactionDto {
    email?: string;
}
export declare const transactionsSchema: Joi.ObjectSchema<any>;
export declare const paymentSchema: Joi.ObjectSchema<any>;
export declare const verifyPaymentSchema: Joi.ObjectSchema<any>;
