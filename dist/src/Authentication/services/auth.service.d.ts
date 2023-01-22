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
    signIn(payload: LoginDto): Promise<{
        token: string | boolean;
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        password: string;
        phoneNumber: string;
        countryCode: string;
        profilePicture: string;
        homeAddress: string;
        userType: string;
        city: string;
        state: string;
        validId: string;
        income: string;
        schoolName: string;
        matricNo: string;
        natureOfBusiness: string;
        roleInCompany: string;
        registrationNo: string;
        companyLocation: string;
        role: string;
        createdAt?: any;
        updatedAt?: any;
        deletedAt?: any;
        version?: any;
        _attributes: import("../../Users/entities/user.entity").default;
        _creationAttributes: import("../../Users/entities/user.entity").default;
        isNewRecord: boolean;
        sequelize: import("sequelize").Sequelize;
        _model: import("sequelize").Model<import("../../Users/entities/user.entity").default, import("../../Users/entities/user.entity").default>;
    }>;
    signUp(payload: RegisterDto): Promise<true | import("../../Users/entities/user.entity").default>;
    forgotPassword(payload: FindUserDto): Promise<{
        secretReference: string;
    }>;
    resetPassword(payload: ResetPasswordDto): Promise<HttpException | {
        messge: string;
    }>;
}
