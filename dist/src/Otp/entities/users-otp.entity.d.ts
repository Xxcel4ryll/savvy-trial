import { Model } from 'sequelize-typescript';
export default class UsersOTP extends Model<UsersOTP> {
    id: string;
    userId: string;
    secret: string;
}
