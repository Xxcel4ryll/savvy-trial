"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateQuantity = exports.startRentSchema = exports.BrandSchema = exports.productTypeSchema = exports.updateProductSchema = exports.productSchema = exports.UpdateRentStart = exports.ProductTypeDto = exports.BrandDto = exports.ProductDto = void 0;
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
class UpdateRentStart {
}
exports.UpdateRentStart = UpdateRentStart;
exports.productSchema = Joi.object().keys({
    productTypeId: Joi.string().uuid().required(),
    name: Joi.string().optional(),
    title: Joi.string().required(),
    brand: Joi.string().required(),
    isVisible: Joi.string().optional(),
    price: Joi.number().required(),
    description: Joi.string().optional(),
    specifications: Joi.array().items(Joi.string()).required(),
    productType: Joi.string().valid('RENT', 'BUY').required(),
    overview: Joi.string().optional(),
    accessories: Joi.array().items(Joi.string()).optional(),
    mainImage: Joi.optional(),
    productImages: Joi.array().optional(),
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
    productType: Joi.string().valid('RENT', 'BUY'),
}).or('brand', 'price', 'title', 'quantity', 'description', 'productType', 'images', 'isVisible', 'productTypeId', 'name');
exports.productTypeSchema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
});
exports.BrandSchema = Joi.object().keys({
    name: Joi.string().required(),
    slug: Joi.string().required(),
    image: Joi.string().required(),
});
exports.startRentSchema = Joi.object().keys({
    rentStart: Joi.date().optional(),
    productId: Joi.string().optional()
});
exports.updateQuantity = Joi.object().keys({
    quantity: Joi.number().integer().optional(),
    productId: Joi.string().optional()
});
//# sourceMappingURL=product.dto.js.map