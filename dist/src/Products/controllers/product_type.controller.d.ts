import { ProductTypeService } from '../services/product_type.service';
import { ProductTypeDto } from '../dtos/index';
import { Request } from 'express';
export declare class ProductTypeController {
    private productTypeService;
    constructor(productTypeService: ProductTypeService);
    getProductTypes(req: Request): Promise<{
        rows: import("../entities/product_type.entity").default[];
        count: number;
    }>;
    createProductType(productType: ProductTypeDto): Promise<import("../entities/product_type.entity").default>;
}
