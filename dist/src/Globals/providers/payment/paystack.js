"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const config = require('../../../../core/config');
class Paystack {
    constructor(options = {}) {
        this.apiKey = config.payment.paystackPublicKey;
        this.secretKey = config.payment.paystackSecretKey;
        this.baseUrl = config.payment.paystackApiUrl;
        this.paystackAPI = axios_1.default.create({
            baseURL: this.baseUrl,
        });
    }
    async createCustomer(customer) {
        const errorMessage = 'could not carry out transaction please try again later';
        const user = {
            email: customer.email,
            first_name: customer.firstName,
            last_name: customer.lastName,
            phone: customer.phoneNumber,
        };
        try {
            const { data } = await this.paystackAPI.post('/customer', user, {
                headers: {
                    Authorization: `Bearer ${this.secretKey}`,
                },
            });
            if (!data || !data.data) {
                return Promise.reject(errorMessage);
            }
            return data.data;
        }
        catch (error) {
            return Promise.reject(errorMessage);
        }
    }
    async fetchCustomer(customer) {
        const errorMessage = 'could not carry out transaction please try again later';
        try {
            const { data } = await this.paystackAPI.get(`/customer/${customer}`, {
                headers: {
                    Authorization: `Bearer ${this.secretKey}`,
                },
            });
            if (!data || !data.responseBody || !data.responseBody.accessToken) {
                return Promise.reject(errorMessage);
            }
            return data.responseBody;
        }
        catch (error) {
            return Promise.reject(errorMessage);
        }
    }
    async generateWallet(customer) {
        const errorMessage = 'could not carry out transaction please try again later';
        const user = {
            customer: customer.code,
            preferred_bank: 'test-bank',
        };
        try {
            const { data } = await this.paystackAPI.post(`/dedicated_account`, user, {
                headers: {
                    Authorization: `Bearer ${this.secretKey}`,
                },
            });
            if (!data || !data.data) {
                return Promise.reject(errorMessage);
            }
            return data;
        }
        catch (error) {
            console.log(error);
            throw new Error(errorMessage);
        }
    }
    async cardDeposit(card) {
        const errorMessage = 'could not carry out transaction please try again later';
        const user = {
            email: card.email,
            amount: card.amount * 10,
            reference: '' + Math.floor(Math.random() * 1000000000 + 1),
            callback_url: '',
            channels: [card.method]
        };
        try {
            const { data } = await this.paystackAPI.post(`/transaction/initialize`, user, {
                headers: {
                    Authorization: `Bearer ${this.secretKey}`,
                },
            });
            if (!data || !data.data) {
                return Promise.reject(errorMessage);
            }
            return data;
        }
        catch (error) {
            throw new Error(errorMessage);
        }
    }
    async verifyTransaction({ reference }) {
        const errorMessage = 'could not carry out transaction please try again later';
        try {
            const { data } = await this.paystackAPI.get(`/transaction/verify/${reference}`, {
                headers: {
                    Authorization: `Bearer ${this.secretKey}`,
                },
            });
            if (!data || !data.data) {
                return Promise.reject(errorMessage);
            }
            return data;
        }
        catch (error) {
            throw new Error(errorMessage);
        }
    }
}
exports.default = Paystack;
//# sourceMappingURL=paystack.js.map