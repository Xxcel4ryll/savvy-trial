import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserModule } from 'src/Users/user.module';
import { UserOtpModule } from 'src/Otp/otp.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UserModule, UserOtpModule],
  exports: [AuthService],
})
export class AuthModule {}
