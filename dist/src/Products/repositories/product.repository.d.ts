import Products from '../entities/product.entity';
import ProductType from '../entities/product_type.entity';
import ProductImages from '../entities/product_images.entity';
import ProductSpecs from '../entities/product_specification.entity';
import UserFavourite from 'src/Users/entities/user_favourite.entity';
export default class ProductsRepository {
    private readonly productEntity;
    private readonly productImages;
    private readonly productSpecs;
    private productType;
    private favouriteEntity;
    constructor(productEntity: typeof Products, productImages: typeof ProductImages, productSpecs: typeof ProductSpecs, productType: typeof ProductType, favouriteEntity: typeof UserFavourite);
    create(user: any, payload: any): Promise<Products>;
    modify(criteria: any, updates: any): Promise<[affectedCount: number]>;
    find(user: any, { limit, offset, ...criteria }: {
        [x: string]: any;
        limit: any;
        offset: any;
    }): Promise<{
        rows: Products[];
        count: number;
    }>;
    findOne(productId: any): Promise<Products>;
    findAll({ limit, offset, ...criteria }: {
        [x: string]: any;
        limit: any;
        offset: any;
    }): Promise<{
        rows: Products[];
        count: number;
    }>;
    check(user?: any, criteria?: any): Promise<Products>;
    search(user: any, query: any): Promise<Products>;
    delete(productId: any): Promise<number[]>;
    addConfirmTime(productId: any): Promise<void>;
}
