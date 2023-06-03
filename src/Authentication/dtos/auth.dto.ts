import * as Joi from 'joi';

export class LoginDto {
  email: string;
  phoneNumber: string;
  password: string;
  id: string;
}

export class RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastname: string;
  phoneNumber: string;
  countryCode: string;
  userType: string;
}

export class ResetPasswordDto {
  email: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
  token: string;
  secretReference: string;
}

export class FindUserDto {
  email?: string;
  phoneNumber?: string;
  id?: string;
}

export const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const registerSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  countryCode: Joi.string().default('NG'),
  userType: Joi.number().default('USER'),
});

export const adminRegisterSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  countryCode: Joi.string().default('NG'),
  userType: Joi.string().default('ADMIN').required(),
}).default();

export const forgotPasswordSchema = Joi.object().keys({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object().keys({
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
