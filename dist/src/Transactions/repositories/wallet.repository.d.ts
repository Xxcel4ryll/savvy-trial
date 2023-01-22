import Wallet from '../entities/wallet.entity';
import TransactionRepository from '../repositories/transaction.repository';
export default class WalletRepository {
    private readonly walletEntity;
    private transaction;
    constructor(walletEntity: typeof Wallet, transaction: TransactionRepository);
    find(id: any): Promise<Wallet>;
    findByUser(userId: any): Promise<Wallet[]>;
    create(options: any): Promise<[Wallet, boolean]>;
    balanceLogic({ userId, userType, currency }: {
        userId: any;
        userType: any;
        currency?: string;
    }): Promise<import("../entities/transaction.entity").default>;
}
