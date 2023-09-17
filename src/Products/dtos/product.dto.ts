import * as Joi from 'joi';

export class ProductDto {
  productTypeId : string;
  name?: string;
  title?: string;
  brand?: string;
  isVisible?: string;
  productType?: string;
  productId?: string;
  overview?: string;
  mainImage: string;
  accessories?: string[];
  specifications?: string[];
  productImage: string[];
}

export class BrandDto {
  name: string;
  image: string;
  slug: string;
}

export class ProductTypeDto {
  name: string;
  description: string;
}

export const productSchema = Joi.object().keys({
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
  images: Joi.string(),
  specification: Joi.array().items(Joi.string()),
  productType: Joi.string().valid('RENT', 'BUY'),
}).or(
  'brand', 
  'price', 
  'title',
  'quantity',
  'description',
  'productType',
  'images',
  'isVisible',
  'productTypeId',
  'name',
  );

export const productTypeSchema = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

export const BrandSchema = Joi.object().keys({
  name: Joi.string().required(),
  slug: Joi.string().required(),
  image: Joi.string().required(),
});
