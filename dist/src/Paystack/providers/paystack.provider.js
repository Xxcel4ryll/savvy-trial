"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaystackProviders = void 0;
const paystack_entity_1 = require("../entities/paystack.entity");
exports.PaystackProviders = [
    {
        provide: 'PAYSTACK_ENTITY',
        useValue: paystack_entity_1.default,
    },
];
//# sourceMappingURL=paystack.provider.js.map