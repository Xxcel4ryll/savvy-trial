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
let ProductImageRepository = class ProductImageRepository {
    constructor(productImageEntity) {
        this.productImageEntity = productImageEntity;
    }
    async addImages(productId, images) {
        console.log();
        try {
            let savedImages = [];
            for (const image of images) {
                const savedImage = await this.productImageEntity.create({
                    productId,
                    image
                });
                savedImages.push(savedImage);
            }
            return savedImages;
        }
        catch (error) {
            throw error;
        }
    }
    modify(criteria, updates) {
        return this.productImageEntity.update(updates, {
            where: criteria,
        });
    }
    find(criteria) {
        return this.productImageEntity.findAll({
            where: criteria,
            raw: true
        });
    }
    check(criteria) {
        return this.productImageEntity.findOne({
            where: criteria,
        });
    }
};
ProductImageRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PRODUCT_IMAGE_ENTITY')),
    __metadata("design:paramtypes", [Object])
], ProductImageRepository);
exports.default = ProductImageRepository;
//# sourceMappingURL=product_images.repository.js.map