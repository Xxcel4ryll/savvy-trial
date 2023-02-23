import { Model } from 'sequelize-typescript';
export default class PurchasedProduct extends Model<PurchasedProduct> {
    id: string;
    transactionId: string;
    paymentType: string;
    userId: string;
    productId: string;
    amount: number;
}
