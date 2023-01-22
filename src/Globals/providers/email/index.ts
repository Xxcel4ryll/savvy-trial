/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as Path from 'path';
import * as fs from 'fs';
const Template7 = require('template7');

import Nodemailer from './nodemailer';

@Injectable()
export class Email {
  emailProvider = new Nodemailer();

  constructor() {
    this.emailProvider = new Nodemailer();
  }

  async send(templateName, options) {
    console.log(
      `Sending email - template - ${templateName} - options - ${options}`,
    );
    const { context } = options || {};
    const html = this.html(templateName, context);
    try {
      await this.emailProvider.send(html, options);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          name: 'InternalServerError',
          error: 'Oops! An error occured while sending email',
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  html(templateName, context) {
    const pathToTemplate = Path.resolve(
      __dirname,
      `templates/${templateName}.html`,
    );
    const content = fs.readFileSync(pathToTemplate).toString('utf-8');
    const compiled = Template7(content).compile();
    return compiled(context);
  }
}
