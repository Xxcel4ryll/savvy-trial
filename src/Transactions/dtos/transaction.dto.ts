import * as Joi from 'joi';

export class TransactionDto {
  email?: string;
}

export const transactionsSchema = Joi.object().keys({
  txType: Joi.string(),
});
