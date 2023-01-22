"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeProfileSchema = exports.profileUpdateSchema = exports.userSchema = exports.UserDto = void 0;
const Joi = require("joi");
class UserDto {
}
exports.UserDto = UserDto;
exports.userSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
exports.profileUpdateSchema = Joi.object()
    .keys({
    email: Joi.string().email(),
    phoneNumber: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    countryCode: Joi.string(),
    homeAddress: Joi.string(),
    userType: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
})
    .or('email', 'phoneNumber', 'firstName', 'lastName', 'countryCode', 'homeAddress', 'city', 'state');
exports.completeProfileSchema = Joi.object().keys({
    accountType: Joi.string().valid('INDIVIDUAL', 'CORPORATION').required(),
    setup: Joi.object()
        .when('accountType', {
        is: 'INDIVIDUAL',
        then: Joi.object().keys({
            bvn: Joi.string().required(),
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
            bvn: Joi.string().required(),
            natureOfBusiness: Joi.string().required(),
            validId: Joi.string().required(),
            roleInCompany: Joi.string().required(),
            registrationNo: Joi.string().required(),
            companyLocation: Joi.string().required(),
        }),
    }))
        .required(),
});
//# sourceMappingURL=user.dto.js.map