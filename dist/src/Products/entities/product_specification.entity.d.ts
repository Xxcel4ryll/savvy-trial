import { Model } from 'sequelize-typescript';
import Products from './product.entity';
export default class ProductSpecification extends Model<ProductSpecification> {
    id: string;
    productId: string;
    specifications: string;
    products: Products;
}
