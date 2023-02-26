import { Module } from '@nestjs/common';
import { AuthModule } from './Authentication/auth.module';
import { GlobalModule } from './Globals/global.module';
import { DatabaseModule } from './Database/database.module';
import { ProductModule } from './Products/product.module';
import { FileModule } from './Files/file.module';
import { SettingsModule } from './Settings/settings.module';
// import { UserModule } from './Users/user.module';
// import { PaystackModule } from './Paystack/paystack.module';
// import { TransactionModule } from './Transactions/transaction.module';

@Module({
  imports: [
    DatabaseModule,
    GlobalModule,
    AuthModule,
    ProductModule,
    FileModule,
    SettingsModule
    // UserModule,
    // PaystackModule,
    // TransactionModule,
  ],
  exports: [],
})
export class AppModule {}
