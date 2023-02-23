import { TransactionService } from '../services/transaction.service';
import { Request } from 'express';
export declare class TransactionController {
    private transactionService;
    constructor(transactionService: TransactionService);
    getTransactions(req: Request): Promise<{
        rows: import("../entities/transaction.entity").default[];
        count: number;
    }>;
    getWallet(req: Request): Promise<{
        walletBalance: number;
        wallet: import("../entities/wallet.entity").default[];
    }>;
    payment(req: Request, payload: object): Promise<any>;
    verifyPayment(req: Request, payload: object): Promise<void>;
    transactionWebhook(webhook: object): Promise<any>;
}
