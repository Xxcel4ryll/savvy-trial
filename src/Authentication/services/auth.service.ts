import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as _ from 'lodash';

import { Encode } from 'src/Globals/providers/encode';
import { CryptoEncrypt } from 'src/Globals/providers/encrypt';
import { UserOtpService } from 'src/Otp/services/users-otp.service';
import { UserService } from '../../Users/services/user.service';
import {
  FindUserDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
} from '../dtos/index';

@Injectable()
export class AuthService {
  constructor(
    private cryptoEncrypt: CryptoEncrypt,
    private encode: Encode,
    private userService: UserService,
    private otpService: UserOtpService,
  ) {}

  async signIn(payload: LoginDto) {
    const user = await this.userService.find(payload);

    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          name: 'UNAUTHORIZED',
          error: 'Invalid User or Password',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const hash = this.cryptoEncrypt.hashPassword(payload.password);
    const match = this.cryptoEncrypt.comparePassword(hash, user.password);

    if (!match) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          name: 'UNAUTHORIZED',
          error: 'Invalid User or Password',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = this.encode.sign({
      id: user.id,
      role: user.role,
    });

    return _.omit({
      ...user.dataValues,
      isCompleted: Object.values(user.dataValues).every(props => props !== null && props !== ''),
      token
    }, [
      'password',
      'homeAddress',
      'city',
      'state',
      'validId',
      'income',
      'schoolName',
      'matricNo',
      'natureOfBusiness',
      'roleInCompany',
      'registrationNo',
      'companyLocation'
    ]);
  }

  async signUp(payload: RegisterDto) {
    const userExist = await this.userService.create(payload);

    if (!userExist) {
      throw new HttpException(
        {
          statusCode: HttpStatus.FOUND,
          name: 'UserExists',
          error: 'User already exist',
        },
        HttpStatus.FOUND,
      );
    }

    return userExist;
  }

  async forgotPassword(payload: FindUserDto) {
    const user = await this.userService.find(payload);

    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          name: 'NotFound',
          error: 'Invalid User',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.otpService.generateOtp(user);
  }

  async resetPassword(payload: ResetPasswordDto) {
    const user = await this.userService.find(payload);

    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          name: 'NotFound',
          error: 'Invalid User',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const isValid = await this.otpService.verifyOtp({
      token: payload.token,
      secretReference: payload.secretReference,
    });

    if (!isValid) {
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          name: 'Forbidden',
          error: 'Invalid or Expired Token',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    return (await this.userService.resetPassword(payload))
      ? { messge: 'Password successfully updated' }
      : new HttpException('Password not updated', HttpStatus.FORBIDDEN);
  }
}
