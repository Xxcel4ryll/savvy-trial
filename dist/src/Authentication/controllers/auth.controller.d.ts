import { AuthService } from '../services/auth.service';
import { LoginDto, RegisterDto, FindUserDto, ResetPasswordDto } from '../dtos/index';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    status(): {
        status: boolean;
        message: string;
    };
    signIn(auth: LoginDto): Promise<{
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
        dataValues: import("../../Users/entities/user.entity").default;
        _creationAttributes: import("../../Users/entities/user.entity").default;
        isNewRecord: boolean;
        sequelize: import("sequelize").Sequelize;
        _model: import("sequelize").Model<import("../../Users/entities/user.entity").default, import("../../Users/entities/user.entity").default>;
    }>;
    register(auth: RegisterDto): Promise<true | import("../../Users/entities/user.entity").default>;
    forgot(auth: FindUserDto): Promise<{
        secretReference: string;
    }>;
    reset(auth: ResetPasswordDto): Promise<import("@nestjs/common").HttpException | {
        messge: string;
    }>;
}
