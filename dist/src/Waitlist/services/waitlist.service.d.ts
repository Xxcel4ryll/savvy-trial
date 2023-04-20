import ProductTypeRepository from '../repositories/waitlist.repository';
export declare class WaitlistService {
    private productTypeRepository;
    constructor(productTypeRepository: ProductTypeRepository);
    find(query: any): Promise<{
        rows: import("../entities/waitlist.entity").default[];
        count: number;
    }>;
    create(payload: any): Promise<import("../entities/waitlist.entity").default>;
}
