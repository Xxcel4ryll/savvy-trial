import * as Joi from 'joi';

export class WaitlistDto {
  email: string;
  name: string;
}

export const waitlistSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
});
