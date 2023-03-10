import { HttpException } from '@nestjs/common';
import { Encode } from 'src/Globals/providers/encode';
import { CryptoEncrypt } from 'src/Globals/providers/encrypt';
import { UserOtpService } from 'src/Otp/services/users-otp.service';
import { UserService } from '../../Users/services/user.service';
import { FindUserDto, LoginDto, RegisterDto, ResetPasswordDto } from '../dtos/index';
export declare class AuthService {
    private cryptoEncrypt;
    private encode;
    private userService;
    private otpService;
    constructor(cryptoEncrypt: CryptoEncrypt, encode: Encode, userService: UserService, otpService: UserOtpService);
    signIn(payload: LoginDto): Promise<any>;
    signUp(payload: RegisterDto): Promise<true | import("../../Users/entities/user.entity").default>;
    forgotPassword(payload: FindUserDto): Promise<{
        secretReference: string;
    }>;
    resetPassword(payload: ResetPasswordDto): Promise<HttpException | {
        messge: string;
    }>;
}
