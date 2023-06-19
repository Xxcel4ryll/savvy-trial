import Product from 'src/Products/entities/product.entity';
import ProductImages from 'src/Products/entities/product_images.entity';
import UserFavorites from '../entities/user_favourite.entity';
export default class UserFavoritesRepository {
    private readonly userFavouriteEntity;
    private readonly productEntity;
    private readonly productImageEntity;
    constructor(userFavouriteEntity: typeof UserFavorites, productEntity: typeof Product, productImageEntity: typeof ProductImages);
    findById(id: any): Promise<UserFavorites>;
    find(userId: any): Promise<{
        rows: UserFavorites[];
        count: number;
    }>;
    create(payload: any): Promise<[UserFavorites, boolean]>;
    modify(criteriaObj: any, updates: any): Promise<[affectedCount: number]>;
    remove(criteriaObj: any): Promise<number>;
}
