"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitListProviders = void 0;
const waitlist_entity_1 = require("../entities/waitlist.entity");
exports.WaitListProviders = [
    {
        provide: 'WAITLIST_ENTITY',
        useValue: waitlist_entity_1.default,
    },
];
//# sourceMappingURL=waitlist.provider.js.map