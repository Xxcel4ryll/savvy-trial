import Wallet from '../entities/wallet.entity';
import Transaction from '../entities/transaction.entity';
export declare const TransactionProviders: ({
    provide: string;
    useValue: typeof Wallet;
} | {
    provide: string;
    useValue: typeof Transaction;
})[];
