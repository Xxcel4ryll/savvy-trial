import { Model } from 'sequelize-typescript';
import Products from './product.entity';
export default class ProductImages extends Model<ProductImages> {
    id: string;
    productId: string;
    image: string;
    products: Products;
}
