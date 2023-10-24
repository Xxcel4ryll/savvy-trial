import ProductTypeRepository from '../repositories/product_type.repository';
export declare class ProductTypeService {
    private productTypeRepository;
    constructor(productTypeRepository: ProductTypeRepository);
    find(user: any, query: any): Promise<{
        rows: import("../entities/product_type.entity").default[];
        count: number;
    }>;
    findOneAndPopulate(user: any, query: any): Promise<import("../entities/product_type.entity").default>;
    create(payload: any): Promise<import("../entities/product_type.entity").default>;
}
