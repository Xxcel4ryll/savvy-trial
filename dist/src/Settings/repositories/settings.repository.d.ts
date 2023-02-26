import { Faqs } from '../entities/settings.entity';
export default class SettingsRepository {
    private readonly faqs;
    constructor(faqs: typeof Faqs);
    find(): Promise<Faqs[]>;
}
