import { Model } from 'sequelize-typescript';
export default class Wallet extends Model<Wallet> {
    id: string;
    userId: string;
    userType: string;
    bankId: string;
    bankName: string;
    accountName: string;
    currency: string;
    medium: string;
    accountNumber: string;
}
