import Transaction from '../entities/transaction.entity';
import PurchasedProduct from '../entities/purchased-product.entity';
import Users from 'src/Users/entities/user.entity';
import Product from 'src/Products/entities/product.entity';
export default class TransactionRepository {
    private readonly transactionEntity;
    private readonly purchaseProductEntity;
    private readonly userEntity;
    private readonly productEntity;
    constructor(transactionEntity: typeof Transaction, purchaseProductEntity: typeof PurchasedProduct, userEntity: typeof Users, productEntity: typeof Product);
    deposit(txObject: any, { returnObj }?: {
        returnObj?: boolean;
    }): Promise<any>;
    debit(txObject: any, { returnObj }?: {
        returnObj?: boolean;
    }): Promise<any>;
    find(id: any): Promise<Transaction>;
    tranzact({ id: userId, userType, txType, }: {
        id: any;
        userType: any;
        txType: any;
    }): Promise<{
        rows: Transaction[];
        count: number;
    }>;
    calculateBalance({ userId, userType, currency, category, }: {
        userId: any;
        userType: any;
        currency?: string;
        category?: string[];
    }): Promise<Transaction>;
    findByReference(reference: any): Promise<number>;
    fetchAllPurchaseProducts(meta: any): Promise<{
        rows: PurchasedProduct[];
        count: number;
    }>;
    modify(criteriaObj: any, updates: any): Promise<void>;
    findPurchasedProduct(id: any): Promise<PurchasedProduct>;
}
