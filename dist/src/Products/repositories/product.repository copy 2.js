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
let ProductsRepository = class ProductsRepository {
    constructor(productEntity) {
        this.productEntity = productEntity;
    }
    async create(payload) {
        const productExist = await this.check({
            name: payload.name,
        });
        if (productExist) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.PRECONDITION_FAILED,
                name: 'Product Exist',
                error: 'Product already exist!',
            }, common_1.HttpStatus.PRECONDITION_FAILED);
        }
        return this.productEntity.create(payload);
    }
    modify(criteria, updates) {
        return this.productEntity.update(updates, {
            where: criteria,
        });
    }
    find(criteria) {
        return this.productEntity.findAndCountAll({
            where: criteria,
        });
    }
    check(criteria) {
        return this.productEntity.findOne({
            where: criteria,
        });
    }
};
ProductsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PRODUCT_ENTITY')),
    __metadata("design:paramtypes", [Object])
], ProductsRepository);
exports.default = ProductsRepository;
//# sourceMappingURL=product.repository%20copy%202.js.map