import WalletRepository from 'src/Transactions/repositories/wallet.repository';
import TransactionRepository from 'src/Transactions/repositories/transaction.repository';
import { ProductService } from 'src/Products/services/product.service';
import UserRepository from 'src/Users/repositories/user.repository';
import { PaystackService } from '../../Globals/providers/payment';
export declare class TransactionService {
    private transactionRepository;
    private productsService;
    private paymentService;
    private walletRepository;
    private userRepository;
    constructor(transactionRepository: TransactionRepository, productsService: ProductService, paymentService: PaystackService, walletRepository: WalletRepository, userRepository: UserRepository);
    payment(user: any, payload: any): Promise<any>;
    verify(user: any, payload: any): Promise<void>;
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
