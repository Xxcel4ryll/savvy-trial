import { Model } from 'sequelize-typescript';
import Products from './product.entity';
export default class ProductAccessory extends Model<ProductAccessory> {
    id: string;
    productId: string;
    accessories: string;
    products: Products;
}
