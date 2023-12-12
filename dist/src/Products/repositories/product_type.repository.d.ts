import UserFavourite from 'src/Users/entities/user_favourite.entity';
import Product from '../entities/product.entity';
import ProductTypes from '../entities/product_type.entity';
export default class ProductTypesRepository {
    private readonly productTypesEntity;
    private readonly productEntity;
    private favouriteEntity;
    constructor(productTypesEntity: typeof ProductTypes, productEntity: typeof Product, favouriteEntity: typeof UserFavourite);
    create(payload: any): Promise<[ProductTypes, boolean]>;
    modify(criteria: any, updates: any): Promise<[affectedCount: number]>;
    find(user: any, criteria: any): Promise<{
        rows: ProductTypes[];
        count: number;
    }>;
    findOneandPopulate(user: any, where: any): Promise<ProductTypes>;
    findandPopulate(user: any, where: any): Promise<Product[]>;
    findType(where: any): Promise<ProductTypes>;
    findOne(criteria: any, attributes?: any[]): Promise<ProductTypes>;
}
