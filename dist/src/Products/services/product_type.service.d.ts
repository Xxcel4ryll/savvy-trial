import { HttpStatus } from '@nestjs/common';
import ProductTypeRepository from '../repositories/product_type.repository';
export declare class ProductTypeService {
    private productTypeRepository;
    constructor(productTypeRepository: ProductTypeRepository);
    find(user: any, query: any): Promise<{
        rows: import("../entities/product_type.entity").default[];
        count: number;
    }>;
    findOneAndPopulate(user: any, query: any): Promise<import("../entities/product_type.entity").default>;
    filterOne(user: any, query: any): Promise<import("../entities/product_type.entity").default | {
        status: HttpStatus;
        message: string;
        products: any[];
    }>;
    create(payload: any): Promise<import("../entities/product_type.entity").default>;
}
