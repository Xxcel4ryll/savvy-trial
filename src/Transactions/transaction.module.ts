import { Module } from '@nestjs/common';
import { TransactionProviders } from './providers/transaction.provider';
import WalletRepository from './repositories/wallet.repository';
import TransactionRepository from './repositories/transaction.repository';
import { TransactionService } from './services/transaction.service';
import { TransactionController } from './controllers/transaction.controller';

@Module({
  controllers: [TransactionController],
  providers: [
    TransactionService,
    WalletRepository,
    TransactionRepository,
    ...TransactionProviders,
  ],
  exports: [
    TransactionService,
    WalletRepository,
    TransactionRepository,
    ...TransactionProviders,
  ],
  // imports: [UserService],
})
export class TransactionModule {}
