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
const providers_1 = require("../../Database/providers");
const DB = providers_1.databaseProviders[0].useFactory();
let TransactionRepository = class TransactionRepository {
    constructor(transactionEntity) {
        this.transactionEntity = transactionEntity;
    }
    async deposit(txObject, { returnObj = false } = {}) {
        return (await DB).transaction(async (transaction) => {
            if (returnObj) {
                return txObject;
            }
            await this.transactionEntity.create(txObject, {
                transaction
            });
            return true;
        });
    }
    async debit(txObject, { returnObj = false } = {}) {
        return (await DB).transaction(async (transaction) => {
            if (returnObj) {
                return txObject;
            }
            return this.transactionEntity.create(txObject, {
                transaction
            });
        });
    }
    find(id) {
        return this.transactionEntity.findOne({
            where: {
                id,
            },
        });
    }
    tranzact({ id: userId, userType, txType, }) {
        return this.transactionEntity.findAndCountAll({
            where: {
                txType: {
                    [sequelize_1.Op.and]: {
                        [sequelize_1.Op.in]: [txType ? txType : ['DEBIT', 'CREDIT']],
                    },
                },
                [sequelize_1.Op.or]: [
                    {
                        senderId: userId,
                        senderType: userType,
                    },
                    {
                        receiverId: userId,
                        receiverType: userType,
                    },
                ],
            },
            order: [['createdAt', 'DESC']]
        });
    }
    calculateBalance({ userId, userType, currency = 'NGN', category = ['DEPOSIT', 'AIRTIME', 'TRANSFER'], }) {
        category = Array.isArray(category) ? category : [category];
        return this.transactionEntity.findOne({
            where: {
                [sequelize_1.Op.and]: [
                    {
                        currency,
                        status: 'APPROVED',
                        [sequelize_1.Op.or]: [
                            {
                                senderId: userId,
                                senderType: userType,
                                txType: 'DEBIT',
                            },
                            {
                                receiverId: userId,
                                receiverType: userType,
                                txType: 'CREDIT',
                            },
                        ],
                    },
                ],
            },
            attributes: [
                [
                    sequelize_1.Sequelize.literal(`
                SUM(CASE WHEN tx_type = 'CREDIT'
                    THEN amount
                    ELSE -1 * amount
                END)
            `),
                    'walletBalance',
                ],
            ],
            raw: true,
        });
    }
    findByReference(reference) {
        return this.transactionEntity.count({
            where: {
                transactionReference: reference,
            },
        });
    }
};
TransactionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('TRANSACTION_ENTITY')),
    __metadata("design:paramtypes", [Object])
], TransactionRepository);
exports.default = TransactionRepository;
//# sourceMappingURL=transaction.repository.js.map