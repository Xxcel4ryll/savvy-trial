import ProductRepository from '../repositories/product.repository';
export declare class ProductService {
    private productRepository;
    constructor(productRepository: ProductRepository);
    find(query: any): Promise<{
        rows: import("../entities/product.entity").default[];
        count: number;
    }>;
    create(payload: any): Promise<[import("../entities/product.entity").default, boolean]>;
}
