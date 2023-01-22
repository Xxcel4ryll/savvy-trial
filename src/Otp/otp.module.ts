import { Module } from '@nestjs/common';
import { UserOtpProviders } from './providers/user-otp.provider';
import UserOtpRepository from './repositories/users-otp.repository';
import { UserOtpService } from './services/users-otp.service';

@Module({
  providers: [UserOtpService, UserOtpRepository, ...UserOtpProviders],
  exports: [UserOtpService, UserOtpRepository, ...UserOtpProviders],
})
export class UserOtpModule {}
