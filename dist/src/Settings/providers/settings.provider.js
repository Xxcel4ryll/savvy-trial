"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsProvider = void 0;
const settings_entity_1 = require("../entities/settings.entity");
exports.SettingsProvider = [
    {
        provide: 'FAQS_ENTITY',
        useValue: settings_entity_1.Faqs,
    },
    {
        provide: 'TERMS_ENTITY',
        useValue: settings_entity_1.TermsAndCondition,
    },
];
//# sourceMappingURL=settings.provider.js.map