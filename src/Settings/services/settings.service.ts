import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import SettingsRepository from '../repositories/settings.repository';

@Injectable()
export class SettingsService {
  constructor(
    private settingssRepository: SettingsRepository
  ) {}

  findFAQs() {
    return this.settingssRepository.find();
  }
}
