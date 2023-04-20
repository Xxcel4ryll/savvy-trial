import { Model } from 'sequelize-typescript';
import Products from './product.entity';
export default class ProductTypes extends Model<ProductTypes> {
    id: string;
    name: string;
    description: string;
    productId: string;
    productTypes: Products[];
    products: Products[];
}
