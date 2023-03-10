"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPaymentSchema = exports.paymentSchema = exports.transactionsSchema = exports.TransactionDto = void 0;
const Joi = require("joi");
class TransactionDto {
}
exports.TransactionDto = TransactionDto;
exports.transactionsSchema = Joi.object().keys({
    txType: Joi.string(),
});
exports.paymentSchema = Joi.object().keys({
    paymentType: Joi.string().allow('Rent', 'Buy').required(),
    products: Joi.array().required(),
    paymentMethod: Joi.string().allow('Wallet', 'Card', 'Bank').required(),
});
exports.verifyPaymentSchema = Joi.object().keys({
    reference: Joi.string().required(),
});
//# sourceMappingURL=transaction.dto.js.map