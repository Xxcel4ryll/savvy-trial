import { Injectable, Inject } from '@nestjs/common';
import {Faqs} from '../entities/settings.entity';

@Injectable()
export default class SettingsRepository {
  constructor(
    @Inject('FAQS_ENTITY')
    private readonly faqs: typeof Faqs,
  ) {}

  find(): Promise<Faqs[]> {
    return this.faqs.findAll<Faqs>();
  }
}
