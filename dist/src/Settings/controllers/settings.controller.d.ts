import { SettingsService } from '../services/settings.service';
import { SettingsDto } from '../dtos/index';
export declare class SettingsController {
    private settingsService;
    constructor(settingsService: SettingsService);
    findFAQs(): Promise<SettingsDto[]>;
}
