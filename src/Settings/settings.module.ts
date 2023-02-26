import { Module } from '@nestjs/common';
import { SettingsController } from './controllers/settings.controller';
import { SettingsProvider } from './providers/settings.provider';
import SettingsRepository from './repositories/settings.repository';
import { SettingsService } from './services/settings.service';

@Module({
  controllers: [SettingsController],
  providers: [SettingsService, SettingsRepository, ...SettingsProvider],
  exports: [SettingsService, SettingsRepository, ...SettingsProvider],
})
export class SettingsModule {}
