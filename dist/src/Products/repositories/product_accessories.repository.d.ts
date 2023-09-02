import ProductAccessory from '../entities/product_accessories.entity';
export default class ProductAccessoriesRepository {
    private readonly productsAccessoryEntity;
    constructor(productsAccessoryEntity: typeof ProductAccessory);
    addAccessory(productId: any, accessory: any): Promise<ProductAccessory[]>;
    modify(criteria: any, updates: any): Promise<[affectedCount: number]>;
    find(criteria: any): Promise<ProductAccessory[]>;
    check(criteria: any): Promise<ProductAccessory>;
}
