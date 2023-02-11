import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CryptoEncrypt } from './providers/encrypt';
import { Encode } from './providers/encode';
import { JwtStrategy } from './strategy';
import { UserModule } from 'src/Users/user.module';
import { Email } from './providers/email';
import { Wallet } from './providers/payment';
import { CloudinaryService } from './providers/upload';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'jwtConstants.secret',
      signOptions: { expiresIn: '60m' },
    }),
    UserModule,
  ],
  providers: [CryptoEncrypt, Encode, JwtStrategy, Wallet, Email, CloudinaryService],
  exports: [CryptoEncrypt, Encode, JwtStrategy, Wallet, Email, CloudinaryService],
})
export class GlobalModule {}
