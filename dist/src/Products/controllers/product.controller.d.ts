/// <reference types="multer" />
import { HttpStatus } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductDto, UpdateRentStart } from '../dtos/index';
import { Request } from 'express';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    getProducts(req: Request): Promise<{
        rows: import("../entities/product.entity").default[];
        count: number;
    }>;
    getAllProducts(req: Request): Promise<{
        rows: import("../entities/product.entity").default[];
        count: number;
    }>;
    createProduct(req: Request, files: {
        mainImage: Express.Multer.File[];
        productImages: Express.Multer.File[];
    }, product: ProductDto): Promise<{
        images: import("../entities/product_images.entity").default[];
        specifications: any;
        accessories: any;
        id: string;
        name: string;
        title: string;
        brand: string;
        isVisible: boolean;
        productType: string;
        productTypes: import("../entities/product_type.entity").default;
        productTypeId: string;
        userFavourite: import("../../Users/entities/user_favourite.entity").default;
        quantity: string;
        description: string;
        overview: string;
        label: string;
        mainImage: string;
        rent_start_time: Date;
        rent_end_time: Date;
        products: import("../../Transactions/entities/purchased-product.entity").default[];
        createdAt?: any;
        updatedAt?: any;
        deletedAt?: any;
        version?: any;
        _attributes: import("../entities/product.entity").default;
        dataValues: import("../entities/product.entity").default;
        _creationAttributes: import("../entities/product.entity").default;
        isNewRecord: boolean;
        sequelize: import("sequelize").Sequelize;
        _model: import("sequelize").Model<import("../entities/product.entity").default, import("../entities/product.entity").default>;
    }>;
    updateProduct(req: Request, product: ProductDto): Promise<"Product successfully updated!" | "Product failed to update">;
    searchProduct(req: Request): Promise<import("../entities/product.entity").default>;
    viewProduct(req: Request, { productId }: ProductDto): Promise<import("../entities/product.entity").default>;
    deleteProduct({ productId }: {
        productId: any;
    }): Promise<{
        message: string;
    }>;
    updateRentProduct(req: Request, { productId }: {
        productId: any;
    }, payload: UpdateRentStart): Promise<{
        status: HttpStatus;
        message: string;
    }>;
    updateProducQuantity(req: Request, { productId }: {
        productId: any;
    }, payload: any): Promise<{
        status: HttpStatus;
        message: string;
    }>;
}
