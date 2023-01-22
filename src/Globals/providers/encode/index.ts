/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// const config = require('../../../../core/config');

@Injectable()
export class Encode {
  constructor(private jwtService: JwtService) {}

  sign(payload) {
    try {
      return this.jwtService.sign(payload, {
        expiresIn: '15m',
        secret: 'config.auth.secret',
      });
    } catch (e) {
      return false;
    }
  }
}
