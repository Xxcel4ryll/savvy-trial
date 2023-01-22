import ProductTypes from '../entities/product_type.entity';
export default class ProductTypesRepository {
    private readonly productTypesEntity;
    constructor(productTypesEntity: typeof ProductTypes);
    create(payload: any): Promise<[ProductTypes, boolean]>;
    modify(criteria: any, updates: any): Promise<[affectedCount: number]>;
    find(criteria: any): Promise<{
        rows: ProductTypes[];
        count: number;
    }>;
}
