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
let ProductAccessoriesRepository = class ProductAccessoriesRepository {
    constructor(productsAccessoryEntity) {
        this.productsAccessoryEntity = productsAccessoryEntity;
    }
    addAccessory(productId, accessory) {
        try {
            return this.productsAccessoryEntity.bulkCreate(accessory.map((spec) => ({
                productId,
                accessories: spec
            })));
        }
        catch (error) {
            throw error;
        }
    }
    modify(criteria, updates) {
        return this.productsAccessoryEntity.update(updates, {
            where: criteria,
        });
    }
    find(criteria) {
        return this.productsAccessoryEntity.findAll({
            where: criteria,
            raw: true
        });
    }
    check(criteria) {
        return this.productsAccessoryEntity.findOne({
            where: criteria,
        });
    }
};
ProductAccessoriesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PRODUCT_ACCESSORY_ENTITY')),
    __metadata("design:paramtypes", [Object])
], ProductAccessoriesRepository);
exports.default = ProductAccessoriesRepository;
//# sourceMappingURL=product_accessories.repository.js.map