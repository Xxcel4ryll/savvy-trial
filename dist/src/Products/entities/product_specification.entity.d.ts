import { Model } from 'sequelize-typescript';
export default class ProductSpecification extends Model<ProductSpecification> {
    id: string;
    productId: string;
    specifications: string;
}
