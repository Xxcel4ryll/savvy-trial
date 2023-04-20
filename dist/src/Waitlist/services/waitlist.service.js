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
exports.WaitlistService = void 0;
const common_1 = require("@nestjs/common");
const waitlist_repository_1 = require("../repositories/waitlist.repository");
let WaitlistService = class WaitlistService {
    constructor(productTypeRepository) {
        this.productTypeRepository = productTypeRepository;
    }
    find(query) {
        return this.productTypeRepository.find(query);
    }
    async create(payload) {
        const [productType, created] = await this.productTypeRepository.create(payload);
        if (created) {
            return productType;
        }
        throw new common_1.HttpException({
            statusCode: common_1.HttpStatus.PRECONDITION_FAILED,
            name: 'PRODUCT_TYPE',
            error: 'Already Created',
        }, common_1.HttpStatus.PRECONDITION_FAILED);
    }
};
WaitlistService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [waitlist_repository_1.default])
], WaitlistService);
exports.WaitlistService = WaitlistService;
//# sourceMappingURL=waitlist.service.js.map