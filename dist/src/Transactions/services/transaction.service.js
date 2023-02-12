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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const providers_1 = require("../../Database/providers");
const wallet_repository_1 = require("../repositories/wallet.repository");
const transaction_repository_1 = require("../repositories/transaction.repository");
const user_repository_1 = require("../../Users/repositories/user.repository");
const sequelize = providers_1.databaseProviders[0].useFactory();
let TransactionService = class TransactionService {
    constructor(transactionRepository, walletRepository, userRepository) {
        this.transactionRepository = transactionRepository;
        this.walletRepository = walletRepository;
        this.userRepository = userRepository;
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
    async transactionWebhook(deposit) {
        try {
            if (deposit.event !== 'charge.success') {
                return Promise.reject('Transaction not successful');
            }
            const _a = deposit.data, { customer: { email: customerEmail, first_name: customerFirstName, last_name: customerLastName }, reference, paidAt, fees: amount, gateway_response: status, authorization: { authorization_code: authCode, receiver_bank_account_number: receiverAccountNumber, receiver_bank: receiverBank, card_type } } = _a, paymentDetails = __rest(_a, ["customer", "reference", "paidAt", "fees", "gateway_response", "authorization"]);
            console.log(deposit.data);
            const transationExists = await this.transactionRepository.findByReference(reference);
            if (transationExists) {
                return 'transaction already exists';
            }
            const user = await this.userRepository.findByEmail(customerEmail);
            if (!user) {
                return Promise.reject('User does not exist');
            }
            const currency = paymentDetails.currencyCode || paymentDetails.currency || 'NGN';
            const transactionPayload = {
                customerEmail,
                customerFirstName,
                customerLastName,
                reference,
                amount: (paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.channel) == 'card' ? ((paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.amount) / 100) : amount,
                authCode,
                status,
                card_type,
                paidAt,
                receiverAccountNumber,
                receiverBank,
                currency,
                user,
                channel: paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails.channel
            };
            const txObject = await this.credit(transactionPayload);
            return await this.transactionRepository.deposit(txObject);
        }
        catch (error) {
            throw error;
        }
    }
    async credit(transactionDetails) {
        return await this.buildTransactionObject({
            txType: 'CREDIT',
            receiverId: transactionDetails.user.id,
            receiverType: transactionDetails.user.userType,
            category: transactionDetails.category || 'DEPOSIT',
            currency: transactionDetails.currency || 'NG',
            email: transactionDetails.user.email,
            amount: transactionDetails.amount,
            status: 'APPROVED',
            medium: transactionDetails.channel ? 'CARD' : 'TRANSFER',
        });
    }
    async debit(transactionDetails) {
        return await this.buildTransactionObject(Object.assign(Object.assign({}, transactionDetails), { txType: 'DEBIT', senderId: transactionDetails.userId, senderType: transactionDetails.userType, category: transactionDetails.category, email: transactionDetails.email, amount: transactionDetails.amount }));
    }
    buildTransactionObject(transactionObject) {
        if (!transactionObject.currency || !transactionObject.category) {
            throw new Error('Cannot create a transaction without category or currency');
        }
        const { category, receiverId, receiverType, senderId, senderType } = transactionObject;
        if (['TRANSFER', 'RENT', 'WITHDRAWAL'].includes(category) &&
            [receiverId, receiverType, senderId, senderType].some((elem) => !elem)) {
            throw new Error(`Cannot handle a ${category} transaction without receiverId, receiverType, senderId or senderType set`);
        }
        return Object.assign(Object.assign({}, transactionObject), { amount: this.roundUp(transactionObject.amount) });
    }
    roundUp(number) {
        return Number(number).toFixed(2);
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
        wallet_repository_1.default,
        user_repository_1.default])
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map