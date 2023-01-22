import { ProductService } from '../services/product.service';
import { ProductDto } from '../dtos/index';
import { Request } from 'express';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    getProducts(req: Request): Promise<{
        rows: import("../entities/product.entity").default[];
        count: number;
    }>;
    createProduct(req: Request, product: ProductDto): Promise<[import("../entities/product.entity").default, boolean]>;
}
