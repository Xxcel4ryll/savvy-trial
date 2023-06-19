/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { authenticator } from 'otplib';
import { Email } from 'src/Globals/providers/email';
import OtpRepository from '../repositories/users-otp.repository';

const config = require('../../../core/config');

// const normalizePhoneNumber = require('../../../helpers/normalize-phone-number');

@Injectable()
export class UserOtpService {
  constructor(private OtpRepository: OtpRepository, private Email: Email) {}

  async generateOtp(user) {
    authenticator.options = {
      digits: config.otp.digits,
      step: config.otp.ttlSeconds,
    };
    const secret = authenticator.generateSecret();
    const token = authenticator.generate(secret);

    const { id } = await this.OtpRepository.saveSecret({
      secret,
      userId: user.id,
    });

    this.Email.send('otp', {
      fromName: 'Savvy Africa',
      fromId: 'info@rockapostolate.org',
      subject: 'Reset Pin OTP',
      to: user.email,
      context: {
        token,
      },
    });
    console.log(token);
    // await this.dispatchNotification(
    //   new SendSMSJob({
    //     content: `Your OTP is ${token}`,
    //     to: normalizePhoneNumber(userExists.phonNumber, userExists.countryCode),
    //   }),
    // );

    return { secretReference: id };
  }

  //   async dispatchNotification(notification) {
  //     this.logger.info(
  //       `${OtpService.name} - sending notification - ${notification}`,
  //     );
  //     try {
  //       this.queue.publish(notification);
  //     } catch (error) {
  //       this.logger.error(
  //         `${OtpService.name} - dispatchNotification - notification error - ${error}`,
  //       );
  //     }
  //   }

  async verifyOtp({ token, secretReference }) {
    const found = await this.OtpRepository.findSecret({
      id: secretReference,
    });

    if (!found || !found.secret) {
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          name: 'InvalidReference',
          error: 'the reference passed is invalid',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    return authenticator.verify({ token, secret: found.secret });
  }
}
