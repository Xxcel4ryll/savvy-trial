import * as Joi from 'joi';
export declare class UserDto {
    email?: string;
    phoneNumber?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    countryCode?: string;
    homeAddress?: string;
    userType?: string;
    city?: string;
    state?: string;
}
export declare const userSchema: Joi.ObjectSchema<any>;
export declare const profileUpdateSchema: Joi.ObjectSchema<any>;
export declare const completeProfileSchema: Joi.ObjectSchema<any>;
