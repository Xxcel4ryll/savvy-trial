import { Module } from '@nestjs/common';
import { PaystackProviders } from './providers/paystack.provider';
import PaystackRepository from './repositories/paystack.repository';

@Module({
  providers: [PaystackRepository, ...PaystackProviders],
  exports: [PaystackRepository, ...PaystackProviders],
  // imports: [UserService],
})
export class PaystackModule {}
