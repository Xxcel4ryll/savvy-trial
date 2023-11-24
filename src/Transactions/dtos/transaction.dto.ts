import * as Joi from 'joi';

export class TransactionDto {
  email?: string;
}

export const transactionsSchema = Joi.object().keys({
  txType: Joi.string(),
});

export const paymentSchema = Joi.object().keys({
 
  products: Joi.array().required().items(
    Joi.object({
       paymentType: Joi.string().allow('Rent', 'Buy').required(),
       id: Joi.string().required(),
       quantity: Joi.number().required()
    })
  ),
  paymentMethod: Joi.string().allow('Wallet', 'Card', 'Bank').required(),
});

export const verifyPaymentSchema = Joi.object().keys({
  reference: Joi.string().required(),
});