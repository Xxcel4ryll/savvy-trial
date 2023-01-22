"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const providers_1 = require("../../Database/providers");
const wallet_repository_1 = require("../repositories/wallet.repository");
const transaction_repository_1 = require("../repositories/transaction.repository");
const sequelize = providers_1.databaseProviders[0].useFactory();
let TransactionService = class TransactionService {
    constructor(transactionRepository, walletRepository) {
        this.transactionRepository = transactionRepository;
        this.walletRepository = walletRepository;
    }
    async wallet(user) {
        try {
            const { id: userId, userType } = user;
            const wallet = await this.walletRepository.findByUser(userId);
            if (!wallet.length) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.PRECONDITION_FAILED,
                    name: 'WALLET',
                    error: 'No wallet found',
                }, common_1.HttpStatus.PRECONDITION_FAILED);
            }
            const balance = await this.walletRepository.balanceLogic({
                userId,
                userType,
            });
            return {
                walletBalance: +balance['walletBalance'],
                wallet,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async transactionWebhook(payload) {
    }
    async transactions(user, query) {
        try {
            return this.transactionRepository.tranzact(Object.assign(Object.assign({}, user), query));
        }
        catch (error) {
            throw error;
        }
    }
};
TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [transaction_repository_1.default,
        wallet_repository_1.default])
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map