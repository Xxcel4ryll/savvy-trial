"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOtpProviders = void 0;
const users_otp_entity_1 = require("../entities/users-otp.entity");
exports.UserOtpProviders = [
    {
        provide: 'USER_OTP_ENTITY',
        useValue: users_otp_entity_1.default,
    },
];
//# sourceMappingURL=user-otp.provider.js.map