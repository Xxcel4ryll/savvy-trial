"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModule = void 0;
const common_1 = require("@nestjs/common");
const transaction_provider_1 = require("./providers/transaction.provider");
const wallet_repository_1 = require("./repositories/wallet.repository");
const transaction_repository_1 = require("./repositories/transaction.repository");
const transaction_service_1 = require("./services/transaction.service");
const transaction_controller_1 = require("./controllers/transaction.controller");
const user_module_1 = require("../Users/user.module");
let TransactionModule = class TransactionModule {
};
TransactionModule = __decorate([
    (0, common_1.Module)({
        controllers: [transaction_controller_1.TransactionController],
        providers: [
            transaction_service_1.TransactionService,
            wallet_repository_1.default,
            transaction_repository_1.default,
            ...transaction_provider_1.TransactionProviders,
        ],
        exports: [
            transaction_service_1.TransactionService,
            wallet_repository_1.default,
            transaction_repository_1.default,
            ...transaction_provider_1.TransactionProviders,
        ],
        imports: [
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
        ],
    })
], TransactionModule);
exports.TransactionModule = TransactionModule;
//# sourceMappingURL=transaction.module.js.map