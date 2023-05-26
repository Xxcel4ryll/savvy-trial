import * as Joi from 'joi';
export declare class ProductDto {
    name?: string;
    title?: string;
    brand?: string;
    isVisible?: string;
    salesOption?: string;
    productId?: string;
}
export declare class BrandDto {
    name: string;
    image: string;
    slug: string;
}
export declare class ProductTypeDto {
    name: string;
    description: string;
}
export declare const productSchema: Joi.ObjectSchema<any>;
export declare const updateProductSchema: Joi.ObjectSchema<any>;
export declare const productTypeSchema: Joi.ObjectSchema<any>;
export declare const BrandSchema: Joi.ObjectSchema<any>;
