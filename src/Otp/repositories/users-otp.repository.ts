import { Injectable, Inject } from '@nestjs/common';
import UsersOTP from '../entities/users-otp.entity';

@Injectable()
export default class OtpRepository {
  findOne: any;
  create: any;

  constructor(
    @Inject('USER_OTP_ENTITY')
    private readonly userOtpEntity: typeof UsersOTP,
  ) {}

  saveSecret(data): Promise<UsersOTP> {
    return this.userOtpEntity.create<UsersOTP>({
      ...data,
    });
  }

  findSecret(data): Promise<UsersOTP> {
    return this.userOtpEntity.findOne<UsersOTP>({
      where: data,
    });
  }
}
