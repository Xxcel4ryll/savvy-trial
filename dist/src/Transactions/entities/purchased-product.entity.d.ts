import { Model } from 'sequelize-typescript';
import Product from 'src/Products/entities/product.entity';
import Users from 'src/Users/entities/user.entity';
export default class PurchasedProduct extends Model<PurchasedProduct> {
    id: string;
    transactionId: string;
    paymentType: string;
    userId: string;
    productId: string;
    amount: number;
    products: Product;
    users: Users;
}
