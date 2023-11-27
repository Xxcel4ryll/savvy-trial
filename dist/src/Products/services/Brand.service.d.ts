import BrandRepository from '../repositories/brand.repository';
import ProductsRepository from '../repositories/product.repository';
export declare class BrandService {
    private brandRepository;
    private productRepository;
    constructor(brandRepository: BrandRepository, productRepository: ProductsRepository);
    find(query: any): Promise<{
        rows: import("../entities/brand.entity").default[];
        count: number;
    }>;
    viewBrandProduct(query: any, brand: any): Promise<{
        rows: import("../entities/product.entity").default[];
        count: number;
    }>;
    create(payload: any): Promise<import("../entities/brand.entity").default>;
}
