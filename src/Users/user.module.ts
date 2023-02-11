import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserProviders } from './providers/user.provider';
import UserRepository from './repositories/user.repository';
import { UserService } from './services/user.service';
import { PaystackModule } from 'src/Paystack/paystack.module';
import { TransactionModule } from 'src/Transactions/transaction.module';
import UserFavoritesRepository from './repositories/user_favorites.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, UserFavoritesRepository, ...UserProviders],
  exports: [UserService, UserRepository, ...UserProviders],
  imports: [PaystackModule, TransactionModule],
})
export class UserModule {}
