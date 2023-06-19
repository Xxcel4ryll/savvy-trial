import { Model } from 'sequelize-typescript';
import Products from '../../Products/entities/product.entity';
export default class UserFavourite extends Model<UserFavourite> {
    static isUserFavouriteQuery({ userId, column }: {
        userId: any;
        column: any;
    }): import("sequelize/types/utils").Literal;
    id: string;
    userId: string;
    productId: string;
    product: Products;
}
