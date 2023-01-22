import Wallet from '../entities/wallet.entity';
import Transaction from '../entities/transaction.entity';

export const TransactionProviders = [
  {
    provide: 'WALLET_ENTITY',
    useValue: Wallet,
  },
  {
    provide: 'TRANSACTION_ENTITY',
    useValue: Transaction,
  },
];
