import * as Joi from 'joi';
export declare class ProductDto {
    productTypeId: string;
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
