import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import WaitlistRepository from '../repositories/waitlist.repository';
import { WaitlistDto } from '../dtos';
import { Email } from 'src/Globals/providers/email';
import { databaseProviders } from 'src/Database/providers';

const DB = databaseProviders[0].useFactory();

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
    const transaction = (await DB).transaction();

    try {
      const [waitlist, created] = await this.waitlistRepository.create(
        payload,
        transaction
      );

      if (!created) {
        throw 'You already joined';
      }

      this.Email.send('waitlist', {
        fromName: 'Savvy Gadget',
        fromId: 'info@rockapostolate.org',
        subject: 'Waitlist',
        to: waitlist.email,
        context: {
          name: payload.name,
      },
      });

      (await transaction).commit();

      return waitlist;
    } catch (err) {
      (await transaction).rollback();

      throw new HttpException(
        {
          statusCode: HttpStatus.PRECONDITION_FAILED,
          name: 'WAITLIST',
          error: err,
        },
        HttpStatus.PRECONDITION_FAILED,
      );
    }
  }
}
