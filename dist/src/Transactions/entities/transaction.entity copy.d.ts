import { Model } from 'sequelize-typescript';
export default class Transaction extends Model<Transaction> {
    id: string;
    senderId: string;
    transactionReference: string;
    senderType: string;
    receiverId: string;
    receiverType: string;
    currency: string;
    amount: number;
    txType: string;
    status: string;
    category: string;
    medium: string;
}
