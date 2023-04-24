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
let ProductTypesRepository = class ProductTypesRepository {
    constructor(productTypesEntity, productEntity, favouriteEntity) {
        this.productTypesEntity = productTypesEntity;
        this.productEntity = productEntity;
        this.favouriteEntity = favouriteEntity;
    }
    create(payload) {
        return this.productTypesEntity.findOrCreate({
            where: {
                name: payload.name,
            },
            defaults: payload,
            raw: true,
        });
    }
    modify(criteria, updates) {
        return this.productTypesEntity.update(updates, {
            where: criteria,
        });
    }
    find(user, criteria) {
        return this.productTypesEntity.findAndCountAll({
            where: criteria,
            include: {
                model: this.productEntity,
                attributes: {
                    include: [
                        [
                            this.favouriteEntity.isUserFavouriteQuery({
                                userId: user.id,
                                column: `'${this.productEntity.name}.id'`
                            }),
                            'isFavorite'
                        ],
                    ],
                },
            }
        });
    }
    findOne(criteria, attributes = []) {
        return this.productTypesEntity.findOne({
            where: criteria,
            attributes
        });
    }
};
ProductTypesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PRODUCT_TYPE_ENTITY')),
    __param(1, (0, common_1.Inject)('PRODUCT_ENTITY')),
    __param(2, (0, common_1.Inject)('USER_FAVOURITES_ENTITY')),
    __metadata("design:paramtypes", [Object, Object, Object])
], ProductTypesRepository);
exports.default = ProductTypesRepository;
//# sourceMappingURL=product_type.repository.js.map