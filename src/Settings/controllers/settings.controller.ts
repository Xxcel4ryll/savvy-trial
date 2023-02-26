import {
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { SettingsService } from '../services/settings.service';
import { SettingsDto } from '../dtos/index';
import { TransformInterceptor } from 'src/Globals/Interceptors/response.interceptor';

@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @UseInterceptors(TransformInterceptor)
  @Get('faqs')
  findFAQs(): Promise<SettingsDto[]> {
    return this.settingsService.findFAQs();
  }
}
