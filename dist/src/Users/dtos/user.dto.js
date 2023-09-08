"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeProfileSchema = exports.profileUpdateSchema = exports.updatePasswordSchema = exports.userSchema = exports.UserDto = void 0;
const Joi = require("joi");
class UserDto {
}
exports.UserDto = UserDto;
exports.userSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
exports.updatePasswordSchema = Joi.object().keys({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().invalid(Joi.ref('oldPassword')).required().messages({
        'any.only': 'A new password is required',
    }),
});
exports.profileUpdateSchema = Joi.object()
    .keys({
    email: Joi.string().email(),
    phoneNumber: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    profilePicture: Joi.string(),
    countryCode: Joi.string(),
    password: Joi.string().optional(),
    homeAddress: Joi.string(),
    userType: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
})
    .or('email', 'phoneNumber', 'firstName', 'profilePicture', 'lastName', 'countryCode', 'homeAddress', 'city', 'state');
exports.completeProfileSchema = Joi.object().keys({
    accountType: Joi.string().valid('INDIVIDUAL', 'CORPORATION').required(),
    setup: Joi.object()
        .when('accountType', {
        is: 'INDIVIDUAL',
        then: Joi.object().keys({
            bvn: Joi.string().length(11).optional(),
            homeAddress: Joi.string().required(),
            validId: Joi.string().required(),
            income: Joi.string(),
            state: Joi.string(),
            schoolName: Joi.string(),
            matricNo: Joi.string(),
        }),
    })
        .concat(Joi.object().when('accountType', {
        is: 'CORPORATION',
        then: Joi.object().keys({
            bvn: Joi.string().length(11).optional(),
            natureOfBusiness: Joi.string().required(),
            validId: Joi.string().optional(),
            roleInCompany: Joi.string().required(),
            registrationNo: Joi.string().required(),
            companyLocation: Joi.string().required(),
        }),
    }))
        .required(),
});
//# sourceMappingURL=user.dto.js.map