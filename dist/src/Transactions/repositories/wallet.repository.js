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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
const transaction_repository_1 = require("../repositories/transaction.repository");
let WalletRepository = class WalletRepository {
    constructor(walletEntity, transaction) {
        this.walletEntity = walletEntity;
        this.transaction = transaction;
    }
    find(id) {
        return this.walletEntity.findOne({
            where: {
                id,
            },
        });
    }
    findByUser(userId) {
        return this.walletEntity.findAll({
            where: {
                userId,
            },
        });
    }
    create(options) {
        return this.walletEntity.findOrCreate({
            where: {
                [sequelize_1.Op.or]: [
                    {
                        accountNumber: options.data.account_number,
                        userId: options.userId,
                        currency: options.data.currency,
                    },
                ],
            },
            defaults: {
                accountNumber: options.data.account_number,
                accountName: options.data.account_name,
                userId: options.userId,
                userType: options.userType,
                bankId: options.data.bank.id,
                bankName: options.data.bank.name,
                currency: options.data.currency,
                medium: 'TRANSFER',
            },
            raw: true,
        });
    }
    balanceLogic({ userId, userType, currency = 'NGN' }) {
        return this.transaction.calculateBalance({ userId, userType, currency });
    }
};
WalletRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('WALLET_ENTITY')),
    __metadata("design:paramtypes", [Object, transaction_repository_1.default])
], WalletRepository);
exports.default = WalletRepository;
//# sourceMappingURL=wallet.repository.js.map