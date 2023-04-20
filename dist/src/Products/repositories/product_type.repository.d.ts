import Product from '../entities/product.entity';
import ProductTypes from '../entities/product_type.entity';
export default class ProductTypesRepository {
    private readonly productTypesEntity;
    private readonly productEntity;
    constructor(productTypesEntity: typeof ProductTypes, productEntity: typeof Product);
    create(payload: any): Promise<[ProductTypes, boolean]>;
    modify(criteria: any, updates: any): Promise<[affectedCount: number]>;
    find(criteria: any): Promise<{
        rows: ProductTypes[];
        count: number;
    }>;
    findOne(criteria: any, attributes?: any[]): Promise<ProductTypes>;
}
