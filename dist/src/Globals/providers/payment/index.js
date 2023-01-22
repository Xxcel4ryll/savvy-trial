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
exports.Wallet = void 0;
const common_1 = require("@nestjs/common");
const paystack_1 = require("./paystack");
let Wallet = class Wallet {
    constructor() {
        this.paymentProvider = new paystack_1.default();
        this.paymentProvider = new paystack_1.default();
    }
    async customer(customer) {
        try {
            return await this.paymentProvider.createCustomer(customer);
        }
        catch (e) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.SERVICE_UNAVAILABLE,
                name: 'InternalServerError',
                error: 'Oops! An error occured while creating customer',
            }, common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
    }
    async fetchCustomer(customer) {
        try {
            return await this.paymentProvider.fetchCustomer(customer);
        }
        catch (e) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.SERVICE_UNAVAILABLE,
                name: 'InternalServerError',
                error: 'Oops! An error occured while fetching a customer',
            }, common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
    }
    async generate(customer) {
        try {
            return await this.paymentProvider.generateWallet(customer);
        }
        catch (e) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.SERVICE_UNAVAILABLE,
                name: 'InternalServerError',
                error: 'Oops! An error occured while generating virtual wallet',
            }, common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
    }
    async cardDeposit(card) {
        try {
            return await this.paymentProvider.cardDeposit(card);
        }
        catch (e) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.SERVICE_UNAVAILABLE,
                name: 'InternalServerError',
                error: 'Oops! An error occured while initializing deposit',
            }, common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
    }
    async verifyTransaction(reference) {
        try {
            return await this.paymentProvider.verifyTransaction(reference);
        }
        catch (e) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.SERVICE_UNAVAILABLE,
                name: 'InternalServerError',
                error: 'Oops! An error occured while verifing transaction',
            }, common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
    }
    async banks() {
        try {
        }
        catch (e) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.SERVICE_UNAVAILABLE,
                name: 'InternalServerError',
                error: 'Oops! An error occured while fetching banks',
            }, common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
    }
};
Wallet = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], Wallet);
exports.Wallet = Wallet;
//# sourceMappingURL=index.js.map