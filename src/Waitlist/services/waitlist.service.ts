import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import WaitlistRepository from '../repositories/waitlist.repository';
import { WaitlistDto } from '../dtos';
import { Email } from 'src/Globals/providers/email';

// const sequelize = databaseProviders[0].useFactory();

@Injectable()
export class WaitlistService {
  constructor(
    private waitlistRepository: WaitlistRepository,
    private Email: Email
  ) {}

  find(query) {
    return this.waitlistRepository.find(query);
  }

  async create(payload) {
    const [waitlist, created] = await this.waitlistRepository.create(
      payload,
    );

    if (created) {
      this.Email.send('waitlist', {
        fromName: 'Savvy Gadget',
        fromId: 'info@rockapostolate.org',
        subject: 'Waitlist',
        to: waitlist.email
      });
      return waitlist;
    }

    throw new HttpException(
      {
        statusCode: HttpStatus.PRECONDITION_FAILED,
        name: 'WAITLIST',
        error: 'You already joined',
      },
      HttpStatus.PRECONDITION_FAILED,
    );
  }
}
