import * as Joi from 'joi';

export class TransactionDto {
  email?: string;
}

export const transactionsSchema = Joi.object().keys({
  txType: Joi.string(),
});

export const paymentSchema = Joi.object().keys({
  // paymentType: Joi.string().allow('Rent', 'Buy').required(),
  products: Joi.array().required(),
  paymentMethod: Joi.string().allow('Wallet', 'Card', 'Bank').required(),
});

export const verifyPaymentSchema = Joi.object().keys({
  reference: Joi.string().required(),
});