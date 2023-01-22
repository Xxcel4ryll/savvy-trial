import { Email } from 'src/Globals/providers/email';
import OtpRepository from '../repositories/users-otp.repository';
export declare class UserOtpService {
    private OtpRepository;
    private Email;
    constructor(OtpRepository: OtpRepository, Email: Email);
    generateOtp(user: any): Promise<{
        secretReference: string;
    }>;
    verifyOtp({ token, secretReference }: {
        token: any;
        secretReference: any;
    }): Promise<boolean>;
}
