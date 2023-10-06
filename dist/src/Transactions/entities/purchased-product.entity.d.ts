import { Model } from 'sequelize-typescript';
import Users from 'src/Users/entities/user.entity';
export default class PurchasedProduct extends Model<PurchasedProduct> {
    id: string;
    transactionId: string;
    paymentType: string;
    userId: string;
    productId: string;
    amount: number;
    users: Users;
}
