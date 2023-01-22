import UserOtp from '../entities/users-otp.entity';

export const UserOtpProviders = [
  {
    provide: 'USER_OTP_ENTITY',
    useValue: UserOtp,
  },
];
