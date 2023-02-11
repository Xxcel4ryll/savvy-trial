import { Model } from 'sequelize-typescript';
import ProductTypes from './product_type.entity';
export default class Product extends Model<Product> {
    id: string;
    name: string;
    title: string;
    brand: string;
    isVisible: boolean;
    salesOption: string;
    productTypes: ProductTypes;
    productTypeId: string;
    price: string;
    quantity: string;
    description: string;
}
