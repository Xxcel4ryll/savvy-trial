import * as Joi from 'joi';

export class SettingsDto {
  heading: string;
  title?: string;
  description?: string;
}