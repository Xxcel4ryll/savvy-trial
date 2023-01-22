import * as Joi from 'joi';

export class ProductDto {
  name?: string;
  title?: string;
  brand?: string;
  isVisible?: string;
  salesOption?: string;
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
  salesOption: Joi.string().valid('RENT', 'BUY').required(),
});

export const productTypeSchema = Joi.object().keys({
  name: Joi.string().email().required(),
  description: Joi.string().required(),
});
