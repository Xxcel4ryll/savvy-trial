import Product from 'src/Products/entities/product.entity';
import UserFavorites from '../entities/user_favourite.entity';
export default class UserFavoritesRepository {
    private readonly userFavouriteEntity;
    private readonly productEntity;
    constructor(userFavouriteEntity: typeof UserFavorites, productEntity: typeof Product);
    findById(id: any): Promise<UserFavorites>;
    find(userId: any): Promise<{
        rows: UserFavorites[];
        count: number;
    }>;
    create(payload: any): Promise<[UserFavorites, boolean]>;
    modify(criteriaObj: any, updates: any): Promise<[affectedCount: number]>;
    remove(criteriaObj: any): Promise<number>;
}
