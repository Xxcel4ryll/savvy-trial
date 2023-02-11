import ProductImage from '../entities/product_images.entity';
export default class ProductImageRepository {
    private readonly productImageEntity;
    constructor(productImageEntity: typeof ProductImage);
    addImages(productId: any, images: any): Promise<ProductImage[]>;
    modify(criteria: any, updates: any): Promise<[affectedCount: number]>;
    find(criteria: any): Promise<ProductImage[]>;
    check(criteria: any): Promise<ProductImage>;
}
