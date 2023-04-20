import * as Joi from 'joi';

export class WaitlistDto {
  email: string;
}

export const waitlistSchema = Joi.object().keys({
  email: Joi.string().email().required()
});
