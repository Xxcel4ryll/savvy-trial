import SettingsRepository from '../repositories/settings.repository';
export declare class SettingsService {
    private settingssRepository;
    constructor(settingssRepository: SettingsRepository);
    findFAQs(): Promise<import("../entities/settings.entity").Faqs[]>;
}
