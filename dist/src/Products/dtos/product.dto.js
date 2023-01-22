"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productTypeSchema = exports.productSchema = exports.ProductTypeDto = exports.ProductDto = void 0;
const Joi = require("joi");
class ProductDto {
}
exports.ProductDto = ProductDto;
class ProductTypeDto {
}
exports.ProductTypeDto = ProductTypeDto;
exports.productSchema = Joi.object().keys({
    productTypeId: Joi.string().uuid().required(),
    name: Joi.string().required(),
    title: Joi.string().required(),
    brand: Joi.string().required(),
    isVisible: Joi.string(),
    salesOption: Joi.string().valid('RENT', 'BUY').required(),
});
exports.productTypeSchema = Joi.object().keys({
    name: Joi.string().email().required(),
    description: Joi.string().required(),
});
//# sourceMappingURL=product.dto.js.map