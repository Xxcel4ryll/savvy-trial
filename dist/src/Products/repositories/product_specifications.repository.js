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
let ProductSpecsRepository = class ProductSpecsRepository {
    constructor(productsSpecificationEntity) {
        this.productsSpecificationEntity = productsSpecificationEntity;
    }
    async addSpecification(productId, specs) {
        try {
            const savedSpecs = [];
            for (const spec of specs) {
                const savedSpec = await this.productsSpecificationEntity.create({
                    productId,
                    specifications: spec
                });
                savedSpecs.push(savedSpec);
            }
            return savedSpecs;
        }
        catch (error) {
            throw error;
        }
    }
    modify(criteria, updates) {
        return this.productsSpecificationEntity.update(updates, {
            where: criteria,
        });
    }
    find(criteria) {
        return this.productsSpecificationEntity.findAll({
            where: criteria,
            raw: true
        });
    }
    check(criteria) {
        return this.productsSpecificationEntity.findOne({
            where: criteria,
        });
    }
};
ProductSpecsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PRODUCT_SPECS_ENTITY')),
    __metadata("design:paramtypes", [Object])
], ProductSpecsRepository);
exports.default = ProductSpecsRepository;
//# sourceMappingURL=product_specifications.repository.js.map