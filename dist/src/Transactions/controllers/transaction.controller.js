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
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const transaction_service_1 = require("../services/transaction.service");
const index_1 = require("../dtos/index");
const validate_pipe_1 = require("../../Globals/providers/validate/validate.pipe");
const role_enum_1 = require("../../Globals/role.enum");
const role_guard_1 = require("../../Globals/Guards/role.guard");
const find_data_request_dto_1 = require("../../dto/request/find.data.request.dto");
const helper_1 = require("../../utils/helper");
let TransactionController = class TransactionController {
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    getTransactions(req) {
        return this.transactionService.transactions(req.user, req === null || req === void 0 ? void 0 : req.query);
    }
    getWallet(req) {
        return this.transactionService.wallet(req.user);
    }
    payment(req, payload) {
        return this.transactionService.payment(req.user, payload);
    }
    verifyPayment(req, payload) {
        return this.transactionService.verify(req.user, payload);
    }
    transactionWebhook(webhook) {
        return this.transactionService.transactionWebhook(webhook);
    }
    async fetchPurchaseProduct(query) {
        const calculatedQuery = (0, helper_1.calculate_query_params)(query);
        const { current_page, total_items, data_response: data, total_pages, } = await this.transactionService.getPurchasedProducts(calculatedQuery, query.type);
        return {
            status: common_1.HttpStatus.OK,
            message: 'Purchased Products retrived successfuly',
            data,
            meta: {
                total_items,
                total_pages,
                current_page
            }
        };
    }
    async editPurchaedProductsStatus({ id }, query) {
        console.log(`---run test ${id} --- ${query.status}`);
        await this.transactionService.updateStatus(id, query.status);
        return {
            status: common_1.HttpStatus.OK,
            message: 'Order Status updated.',
        };
    }
};
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.default)([role_enum_1.default.Admin, role_enum_1.default.User])),
    (0, common_1.UsePipes)(new validate_pipe_1.JoiValidationPipe(index_1.transactionsSchema)),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "getTransactions", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.default)([role_enum_1.default.Admin, role_enum_1.default.User])),
    (0, common_1.Get)('wallet'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "getWallet", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.default)([role_enum_1.default.Admin, role_enum_1.default.User])),
    (0, common_1.UsePipes)(new validate_pipe_1.JoiValidationPipe(index_1.paymentSchema)),
    (0, common_1.Post)('payment'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "payment", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.default)([role_enum_1.default.Admin, role_enum_1.default.User])),
    (0, common_1.UsePipes)(new validate_pipe_1.JoiValidationPipe(index_1.verifyPaymentSchema)),
    (0, common_1.Post)('verify'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "verifyPayment", null);
__decorate([
    (0, common_1.Post)('webhook/paystack'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TransactionController.prototype, "transactionWebhook", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.default)(role_enum_1.default.Admin)),
    (0, common_1.Get)('products'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_data_request_dto_1.FindDataRequestDto]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "fetchPurchaseProduct", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.default)(role_enum_1.default.Admin)),
    (0, common_1.Patch)('products/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "editPurchaedProductsStatus", null);
TransactionController = __decorate([
    (0, common_1.Controller)('transactions'),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService])
], TransactionController);
exports.TransactionController = TransactionController;
//# sourceMappingURL=transaction.controller.js.map