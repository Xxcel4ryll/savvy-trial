import { forwardRef, Module } from '@nestjs/common';
import { TransactionProviders } from './providers/transaction.provider';
import WalletRepository from './repositories/wallet.repository';
import TransactionRepository from './repositories/transaction.repository';
import { TransactionService } from './services/transaction.service';
import { TransactionController } from './controllers/transaction.controller';
import { UserModule } from 'src/Users/user.module';
import UserRepository from 'src/Users/repositories/user.repository';
import { ProductModule } from 'src/Products/product.module';

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
  imports: [
    ProductModule,
    forwardRef(() => UserModule),
  ],
})
export class TransactionModule {}
