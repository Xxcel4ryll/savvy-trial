import Wallet from '../entities/wallet.entity';
import Transaction from '../entities/transaction.entity';
import PurchasedProduct from '../entities/purchased-product.entity';

export const TransactionProviders = [
  {
    provide: 'WALLET_ENTITY',
    useValue: Wallet,
  },
  {
    provide: 'TRANSACTION_ENTITY',
    useValue: Transaction,
  },
  {
    provide: 'PURCHASED_ENTITY',
    useValue: PurchasedProduct,
  },
];
