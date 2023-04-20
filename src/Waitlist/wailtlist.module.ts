import { Module } from '@nestjs/common';
import { WaitListProviders } from './providers/waitlist.provider';
import { WaitlistController } from './controllers/waitlist.controller';
import { WaitlistService } from './services/waitlist.service';
import WaitListRepository from './repositories/waitlist.repository';

@Module({
  controllers: [WaitlistController],
  providers: [WaitlistService, WaitListRepository, ...WaitListProviders],
  exports: [WaitlistService, WaitListRepository, ...WaitListProviders],
})
export class WaitListModule {}
