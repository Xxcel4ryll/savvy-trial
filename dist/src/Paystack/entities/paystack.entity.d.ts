import { Model } from 'sequelize-typescript';
export default class Paystack extends Model<Paystack> {
    id: string;
    userId: string;
    customerCode: string;
}
