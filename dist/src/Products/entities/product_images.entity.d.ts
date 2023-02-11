import { Model } from 'sequelize-typescript';
export default class ProductImages extends Model<ProductImages> {
    id: string;
    productId: string;
    image: string;
}
