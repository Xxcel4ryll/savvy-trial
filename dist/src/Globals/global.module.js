"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const encrypt_1 = require("./providers/encrypt");
const encode_1 = require("./providers/encode");
const strategy_1 = require("./strategy");
const user_module_1 = require("../Users/user.module");
const email_1 = require("./providers/email");
const payment_1 = require("./providers/payment");
const upload_1 = require("./providers/upload");
let GlobalModule = class GlobalModule {
};
GlobalModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: 'jwtConstants.secret',
                signOptions: { expiresIn: '60m' },
            }),
            user_module_1.UserModule,
        ],
        providers: [encrypt_1.CryptoEncrypt, encode_1.Encode, strategy_1.JwtStrategy, payment_1.PaystackService, email_1.Email, upload_1.CloudinaryService],
        exports: [encrypt_1.CryptoEncrypt, encode_1.Encode, strategy_1.JwtStrategy, payment_1.PaystackService, email_1.Email, upload_1.CloudinaryService],
    })
], GlobalModule);
exports.GlobalModule = GlobalModule;
//# sourceMappingURL=global.module.js.map