import BrandRepository from '../repositories/brand.repository';
export declare class BrandService {
    private brandRepository;
    constructor(brandRepository: BrandRepository);
    find(query: any): Promise<{
        rows: import("../entities/brand.entity").default[];
        count: number;
    }>;
    create(payload: any): Promise<import("../entities/brand.entity").default>;
}
