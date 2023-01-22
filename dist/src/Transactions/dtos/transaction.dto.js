"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionsSchema = exports.TransactionDto = void 0;
const Joi = require("joi");
class TransactionDto {
}
exports.TransactionDto = TransactionDto;
exports.transactionsSchema = Joi.object().keys({
    txType: Joi.string(),
});
//# sourceMappingURL=transaction.dto.js.map