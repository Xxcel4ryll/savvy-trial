import * as Joi from 'joi';

export class ProductDto {
  name?: string;
  title?: string;
  brand?: string;
  isVisible?: string;
  salesOption?: string;
  productId?: string;
}

export class ProductTypeDto {
  name: string;
  description: string;
}

export const productSchema = Joi.object().keys({
  productTypeId: Joi.string().uuid().required(),
  name: Joi.string().required(),
  title: Joi.string().required(),
  brand: Joi.string().required(),
  isVisible: Joi.string(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  description: Joi.string(),
  images: Joi.array().items(Joi.string()).required(),
  specification: Joi.array().items(Joi.string()).required(),
  salesOption: Joi.string().valid('RENT', 'BUY').required(),
});

export const updateProductSchema = Joi.object().keys({
  productTypeId: Joi.string().uuid(),
  productId: Joi.string().required(),
  name: Joi.string(),
  title: Joi.string(),
  brand: Joi.string(),
  isVisible: Joi.string(),
  price: Joi.number(),
  quantity: Joi.number(),
  description: Joi.string(),
  images: Joi.array().items(Joi.string()),
  specification: Joi.array().items(Joi.string()),
  salesOption: Joi.string().valid('RENT', 'BUY'),
}).or(
  'brand', 
  'price', 
  'title',
  'quantity',
  'description',
  'salesOption',
  'images',
  'isVisible',
  'productTypeId',
  'name',
  );

export const productTypeSchema = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
});
