import Transaction from '../entities/transaction.entity';
export default class TransactionRepository {
    private readonly transactionEntity;
    constructor(transactionEntity: typeof Transaction);
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
}
