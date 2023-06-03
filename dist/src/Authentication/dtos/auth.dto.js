"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.adminRegisterSchema = exports.registerSchema = exports.loginSchema = exports.FindUserDto = exports.ResetPasswordDto = exports.RegisterDto = exports.LoginDto = void 0;
const Joi = require("joi");
class LoginDto {
}
exports.LoginDto = LoginDto;
class RegisterDto {
}
exports.RegisterDto = RegisterDto;
class ResetPasswordDto {
}
exports.ResetPasswordDto = ResetPasswordDto;
class FindUserDto {
}
exports.FindUserDto = FindUserDto;
exports.loginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
exports.registerSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    countryCode: Joi.string().default('NG'),
    userType: Joi.number().default('USER'),
});
exports.adminRegisterSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    countryCode: Joi.string().default('NG'),
    userType: Joi.string().default('ADMIN').required(),
}).default();
exports.forgotPasswordSchema = Joi.object().keys({
    email: Joi.string().email().required(),
});
exports.resetPasswordSchema = Joi.object().keys({
    token: Joi.string().required(),
    email: Joi.string().email().required(),
    secretReference: Joi.string().required(),
    newPassword: Joi.string().required(),
    confirmPassword: Joi.string()
        .valid(Joi.ref('newPassword'))
        .required()
        .messages({
        'any.only': 'password do not match',
    }),
});
//# sourceMappingURL=auth.dto.js.map