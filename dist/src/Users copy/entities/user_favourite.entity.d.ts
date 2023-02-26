import { Model } from 'sequelize-typescript';
export default class UserFavourite extends Model<UserFavourite> {
    id: string;
    productId: string;
    userId: string;
}
