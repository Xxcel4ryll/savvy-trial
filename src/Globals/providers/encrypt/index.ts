/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
const crypto = require('crypto');
const encrypt = require('../../../../core/config');

@Injectable()
export class CryptoEncrypt {
  hashPassword(password) {
    const hash = crypto.createHash('sha512');
    return hash.update(`${password}${process.env.SHA_512_HASH}`).digest('hex');
  }

  comparePassword(password, hash) {
    return password === hash;
  }
}
