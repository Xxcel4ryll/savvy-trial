import { Model } from 'sequelize-typescript';
export default class ProductPrices extends Model<ProductPrices> {
    id: string;
    amount: number;
}
