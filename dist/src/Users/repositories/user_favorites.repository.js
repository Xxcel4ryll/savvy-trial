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
let UserFavoritesRepository = class UserFavoritesRepository {
    constructor(userFavouriteEntity, productEntity, productImageEntity) {
        this.userFavouriteEntity = userFavouriteEntity;
        this.productEntity = productEntity;
        this.productImageEntity = productImageEntity;
    }
    findById(id) {
        return this.userFavouriteEntity.findOne({
            where: {
                id,
            },
        });
    }
    find(userId) {
        return this.userFavouriteEntity.findAndCountAll({
            where: {
                userId,
            },
            include: {
                model: this.productEntity,
                attributes: ['name', 'title', 'salesOption', 'price', 'brand', 'quantity'],
                include: [
                    {
                        model: this.productImageEntity,
                        attributes: ['image', 'productId']
                    }
                ]
            }
        });
    }
    create(payload) {
        return this.userFavouriteEntity.findOrCreate({
            where: payload,
            defaults: payload,
            raw: true,
        });
    }
    modify(criteriaObj, updates) {
        return this.userFavouriteEntity.update(updates, {
            where: criteriaObj,
        });
    }
    remove(criteriaObj) {
        return this.userFavouriteEntity.destroy({
            where: criteriaObj,
        });
    }
};
UserFavoritesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_FAVOURITES_ENTITY')),
    __param(1, (0, common_1.Inject)('PRODUCT_ENTITY')),
    __param(2, (0, common_1.Inject)('PRODUCT_IMAGE_ENTITY')),
    __metadata("design:paramtypes", [Object, Object, Object])
], UserFavoritesRepository);
exports.default = UserFavoritesRepository;
//# sourceMappingURL=user_favorites.repository.js.map