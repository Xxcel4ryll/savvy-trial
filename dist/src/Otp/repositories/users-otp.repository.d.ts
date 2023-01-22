import UsersOTP from '../entities/users-otp.entity';
export default class OtpRepository {
    private readonly userOtpEntity;
    findOne: any;
    create: any;
    constructor(userOtpEntity: typeof UsersOTP);
    saveSecret(data: any): Promise<UsersOTP>;
    findSecret(data: any): Promise<UsersOTP>;
}
