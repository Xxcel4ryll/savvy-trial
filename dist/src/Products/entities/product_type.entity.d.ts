import { Model } from 'sequelize-typescript';
export default class ProductTypes extends Model<ProductTypes> {
    id: string;
    name: string;
    description: string;
}
