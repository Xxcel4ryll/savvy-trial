import WalletRepository from 'src/Transactions/repositories/wallet.repository';
import TransactionRepository from 'src/Transactions/repositories/transaction.repository';
import UserRepository from 'src/Users/repositories/user.repository';
export declare class TransactionService {
    private transactionRepository;
    private walletRepository;
    private userRepository;
    constructor(transactionRepository: TransactionRepository, walletRepository: WalletRepository, userRepository: UserRepository);
    wallet(user: any): Promise<{
        walletBalance: number;
        wallet: import("../entities/wallet.entity").default[];
    }>;
    transactionWebhook(deposit: any): Promise<any>;
    credit(transactionDetails: any): Promise<any>;
    debit(transactionDetails: any): Promise<any>;
    buildTransactionObject(transactionObject: any): any;
    roundUp(number: any): string;
    transactions(user: any, query: any): Promise<{
        rows: import("../entities/transaction.entity").default[];
        count: number;
    }>;
}
