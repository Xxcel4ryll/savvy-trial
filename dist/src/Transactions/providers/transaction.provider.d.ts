import Wallet from '../entities/wallet.entity';
import Transaction from '../entities/transaction.entity';
import PurchasedProduct from '../entities/purchased-product.entity';
export declare const TransactionProviders: ({
    provide: string;
    useValue: typeof Wallet;
} | {
    provide: string;
    useValue: typeof Transaction;
} | {
    provide: string;
    useValue: typeof PurchasedProduct;
})[];
