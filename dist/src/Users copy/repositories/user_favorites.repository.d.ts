import UserFavorites from '../entities/user_favourite.entity';
export default class UserFavoritesRepository {
    private readonly userFavouriteEntity;
    constructor(userFavouriteEntity: typeof UserFavorites);
    findById(id: any): Promise<UserFavorites>;
    find(userId: any): Promise<{
        rows: UserFavorites[];
        count: number;
    }>;
    create(payload: any): Promise<[UserFavorites, boolean]>;
    modify(criteriaObj: any, updates: any): Promise<[affectedCount: number]>;
}
