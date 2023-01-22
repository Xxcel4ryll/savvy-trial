import * as Joi from 'joi';
export declare class LoginDto {
    email: string;
    phoneNumber: string;
    password: string;
    id: string;
}
export declare class RegisterDto {
    email: string;
    password: string;
    firstName: string;
    lastname: string;
    phoneNumber: string;
}
export declare class ResetPasswordDto {
    email: string;
    password: string;
    newPassword: string;
    confirmPassword: string;
    token: string;
    secretReference: string;
}
export declare class FindUserDto {
    email?: string;
    phoneNumber?: string;
    id?: string;
}
export declare const loginSchema: Joi.ObjectSchema<any>;
export declare const registerSchema: Joi.ObjectSchema<any>;
export declare const forgotPasswordSchema: Joi.ObjectSchema<any>;
export declare const resetPasswordSchema: Joi.ObjectSchema<any>;
