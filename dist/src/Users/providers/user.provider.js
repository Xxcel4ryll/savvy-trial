"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProviders = void 0;
const user_entity_1 = require("../entities/user.entity");
exports.UserProviders = [
    {
        provide: 'USER_ENTITY',
        useValue: user_entity_1.default,
    },
];
//# sourceMappingURL=user.provider.js.map