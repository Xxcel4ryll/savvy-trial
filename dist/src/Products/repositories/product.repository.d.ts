import Products from '../entities/product.entity';
import ProductType from '../entities/product_type.entity';
import ProductImages from '../entities/product_images.entity';
import ProductSpecs from '../entities/product_specification.entity';
export default class ProductsRepository {
    private readonly productEntity;
    private readonly productImages;
    private readonly productSpecs;
    private productType;
    constructor(productEntity: typeof Products, productImages: typeof ProductImages, productSpecs: typeof ProductSpecs, productType: typeof ProductType);
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
