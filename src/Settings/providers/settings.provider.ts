import {Faqs, TermsAndCondition} from '../entities/settings.entity';

export const SettingsProvider = [
  {
    provide: 'FAQS_ENTITY',
    useValue: Faqs,
  },
  {
    provide: 'TERMS_ENTITY',
    useValue: TermsAndCondition,
  },
];
