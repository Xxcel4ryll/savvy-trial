import * as Joi from 'joi';

export class UserDto {
  email?: string;
  phoneNumber?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  countryCode?: string;
  homeAddress?: string;
  userType?: string;
  city?: string;
  image?: string;
  state?: string;
}

export const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const updatePasswordSchema = Joi.object().keys({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().invalid(Joi.ref('oldPassword')).required().messages({
      'any.only': 'A new password is required',
    }),
});

export const profileUpdateSchema = Joi.object()
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
  .or(
    'email',
    'phoneNumber',
    'firstName',
    'profilePicture',
    'lastName',
    'countryCode',
    'homeAddress',
    'city',
    'state',
  );

export const completeProfileSchema = Joi.object().keys({
  accountType: Joi.string().valid('INDIVIDUAL', 'CORPORATION').required(),
  setup: Joi.object()
    .when('accountType', {
      is: 'INDIVIDUAL',
      then: Joi.object().keys({
        bvn: Joi.string().length(11).required(),
        homeAddress: Joi.string().required(),
        validId: Joi.string().required(),
        income: Joi.string(),
        state: Joi.string(),
        schoolName: Joi.string(),
        matricNo: Joi.string(),
      }),
    })
    .concat(
      Joi.object().when('accountType', {
        is: 'CORPORATION',
        then: Joi.object().keys({
          bvn: Joi.string().length(11).required(),
          natureOfBusiness: Joi.string().required(),
          validId: Joi.string().required(),
          roleInCompany: Joi.string().required(),
          registrationNo: Joi.string().required(),
          companyLocation: Joi.string().required(),
        }),
      }),
    )
    .required(),
});


