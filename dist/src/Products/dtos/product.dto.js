"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandSchema = exports.productTypeSchema = exports.updateProductSchema = exports.productSchema = exports.ProductTypeDto = exports.BrandDto = exports.ProductDto = void 0;
const Joi = require("joi");
class ProductDto {
}
exports.ProductDto = ProductDto;
class BrandDto {
}
exports.BrandDto = BrandDto;
class ProductTypeDto {
}
exports.ProductTypeDto = ProductTypeDto;
exports.productSchema = Joi.object().keys({
    productTypeId: Joi.string().uuid().required(),
    name: Joi.string().required(),
    title: Joi.string().required(),
    brand: Joi.string().required(),
    isVisible: Joi.string().optional(),
    price: Joi.number().required(),
    description: Joi.string().optional(),
    specification: Joi.array().items(Joi.string()).required(),
    salesOption: Joi.string().valid('RENT', 'BUY').required(),
    overview: Joi.string().optional(),
    accessory: Joi.array().items(Joi.string()).optional(),
    mainImage: Joi.object().unknown(true).optional(),
    productImages: Joi.array().items(Joi.object().unknown(true)).optional(),
    label: Joi.string().valid('NEW', 'USED').required(),
});
exports.updateProductSchema = Joi.object().keys({
    productTypeId: Joi.string().uuid(),
    productId: Joi.string().required(),
    name: Joi.string(),
    title: Joi.string(),
    brand: Joi.string(),
    isVisible: Joi.string(),
    price: Joi.number(),
    quantity: Joi.number(),
    description: Joi.string(),
    images: Joi.string(),
    specification: Joi.array().items(Joi.string()),
    salesOption: Joi.string().valid('RENT', 'BUY'),
}).or('brand', 'price', 'title', 'quantity', 'description', 'salesOption', 'images', 'isVisible', 'productTypeId', 'name');
exports.productTypeSchema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
});
exports.BrandSchema = Joi.object().keys({
    name: Joi.string().required(),
    slug: Joi.string().required(),
    image: Joi.string().required(),
});
//# sourceMappingURL=product.dto.js.map