"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaystackModule = void 0;
const common_1 = require("@nestjs/common");
const paystack_provider_1 = require("./providers/paystack.provider");
const paystack_repository_1 = require("./repositories/paystack.repository");
let PaystackModule = class PaystackModule {
};
PaystackModule = __decorate([
    (0, common_1.Module)({
        providers: [paystack_repository_1.default, ...paystack_provider_1.PaystackProviders],
        exports: [paystack_repository_1.default, ...paystack_provider_1.PaystackProviders],
    })
], PaystackModule);
exports.PaystackModule = PaystackModule;
//# sourceMappingURL=paystack.module.js.map