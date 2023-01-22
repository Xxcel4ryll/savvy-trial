import WalletRepository from 'src/Transactions/repositories/wallet.repository';
import TransactionRepository from 'src/Transactions/repositories/transaction.repository';
export declare class TransactionService {
    private transactionRepository;
    private walletRepository;
    constructor(transactionRepository: TransactionRepository, walletRepository: WalletRepository);
    wallet(user: any): Promise<{
        walletBalance: number;
        wallet: import("../entities/wallet.entity").default[];
    }>;
    transactionWebhook(payload: any): Promise<void>;
    transactions(user: any, query: any): Promise<{
        rows: import("../entities/transaction.entity").default[];
        count: number;
    }>;
}
