import { Model } from 'sequelize-typescript';
export default class Users extends Model<Users> {
    id: string;
    product_id: string;
    firstName: string;
}
