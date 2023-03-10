import { AuthService } from '../services/auth.service';
import { LoginDto, RegisterDto, FindUserDto, ResetPasswordDto } from '../dtos/index';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    status(): {
        status: boolean;
        message: string;
    };
    signIn(auth: LoginDto): Promise<any>;
    register(auth: RegisterDto): Promise<true | import("../../Users/entities/user.entity").default>;
    forgot(auth: FindUserDto): Promise<{
        secretReference: string;
    }>;
    reset(auth: ResetPasswordDto): Promise<import("@nestjs/common").HttpException | {
        messge: string;
    }>;
}
