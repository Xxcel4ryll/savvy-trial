import Products from '../entities/product.entity';
export default class ProductsRepository {
    private readonly productEntity;
    constructor(productEntity: typeof Products);
    create(payload: any): Promise<Products>;
    modify(criteria: any, updates: any): Promise<[affectedCount: number]>;
    find({ limit, offset, ...criteria }: {
        [x: string]: any;
        limit: any;
        offset: any;
    }): Promise<{
        rows: Products[];
        count: number;
    }>;
    check(criteria: any): Promise<Products>;
    search(query: any): Promise<Products>;
}
