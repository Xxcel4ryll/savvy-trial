import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { WaitlistService } from '../services/waitlist.service';
import { WaitlistDto, waitlistSchema } from '../dtos/index';
import { JoiValidationPipe } from 'src/Globals/providers/validate/validate.pipe';
import Roles from 'src/globals/role.enum';
import RoleGuard from 'src/globals/Guards/role.guard';
import { Request } from 'express';

@Controller('waitlist')
export class WaitlistController {
  constructor(private waitlistService: WaitlistService) {}

  @Get()
  getWaitlists(@Req() req: Request) {
    return this.waitlistService.find(req.query);
  }

  @UsePipes(new JoiValidationPipe(waitlistSchema))
  @Post()
  createWaitlist(@Body() Waitlist: WaitlistDto) {
    return this.waitlistService.create(Waitlist);
  }
}
