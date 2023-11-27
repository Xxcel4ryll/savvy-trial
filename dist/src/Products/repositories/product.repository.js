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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const sequelize_1 = require("sequelize");
let ProductsRepository = class ProductsRepository {
    constructor(productEntity, productImages, productSpecs, productType, favouriteEntity) {
        this.productEntity = productEntity;
        this.productImages = productImages;
        this.productSpecs = productSpecs;
        this.productType = productType;
        this.favouriteEntity = favouriteEntity;
    }
    async create(user, payload) {
        const productExist = await this.check(user, {
            name: payload.name,
            productType: payload.productType
        });
        if (productExist) {
            throw new Error('Product already exist!');
        }
        return this.productEntity.create(payload);
    }
    modify(criteria, updates) {
        return this.productEntity.update(updates, {
            where: criteria,
        });
    }
    find(user, _a) {
        var { limit, offset } = _a, criteria = __rest(_a, ["limit", "offset"]);
        return this.productEntity.findAndCountAll({
            where: criteria,
            attributes: {
                include: [
                    [
                        this.favouriteEntity.isUserFavouriteQuery({
                            userId: user.id,
                            column: `${this.productEntity.name}.id`
                        }),
                        'isFavorite'
                    ],
                ],
            },
            include: [
                {
                    model: this.productImages,
                    attributes: ['productId', 'image']
                },
                {
                    model: this.productSpecs,
                    attributes: ['productId', 'specifications']
                },
                {
                    model: this.productType,
                    attributes: ['name']
                }
            ],
            order: [['createdAt', 'DESC']],
            limit: parseInt(limit) || 10,
            offset: parseInt(offset) || 0
        });
    }
    findOne(productId) {
        return this.productEntity.findOne({
            where: {
                id: productId
            },
            include: [
                {
                    model: this.productImages,
                    attributes: ['productId', 'image']
                },
                {
                    model: this.productSpecs,
                    attributes: ['productId', 'specifications']
                },
                {
                    model: this.productType,
                    attributes: ['name']
                }
            ],
        });
    }
    findAllBrandsProducts({ limit, offset, where }) {
        return this.productEntity.findAndCountAll({
            where,
            include: [
                {
                    model: this.productImages,
                    attributes: ['productId', 'image']
                },
                {
                    model: this.productSpecs,
                    attributes: ['productId', 'specifications']
                },
                {
                    model: this.productType,
                    attributes: ['name']
                }
            ],
            order: [['createdAt', 'DESC']],
            limit: parseInt(limit) || 10,
            offset: parseInt(offset) || 0
        });
    }
    findAll(_a) {
        var { limit, offset } = _a, criteria = __rest(_a, ["limit", "offset"]);
        return this.productEntity.findAndCountAll({
            where: criteria,
            include: [
                {
                    model: this.productImages,
                    attributes: ['productId', 'image']
                },
                {
                    model: this.productSpecs,
                    attributes: ['productId', 'specifications']
                },
                {
                    model: this.productType,
                    attributes: ['name']
                }
            ],
            order: [['createdAt', 'DESC']],
            limit: parseInt(limit) || 10,
            offset: parseInt(offset) || 0
        });
    }
    check(user, criteria) {
        return this.productEntity.findOne({
            where: criteria,
            attributes: {
                include: [
                    [
                        this.favouriteEntity.isUserFavouriteQuery({
                            userId: user.id,
                            column: `${this.productEntity.name}.id`
                        }),
                        'isFavorite'
                    ],
                ],
            },
        });
    }
    checkProduct(id) {
        return this.productEntity.findByPk(id);
    }
    search(user, query) {
        return this.productEntity.findOne({
            where: {
                isVisible: true,
                [sequelize_1.Op.or]: [
                    {
                        title: {
                            [sequelize_1.Op.like]: `%${query}%`,
                        },
                    },
                    {
                        name: {
                            [sequelize_1.Op.like]: `%${query}%`,
                        },
                    },
                    {
                        brand: {
                            [sequelize_1.Op.like]: `%${query}%`,
                        },
                    },
                    {
                        price: {
                            [sequelize_1.Op.like]: `%${query}%`,
                        },
                    },
                    {
                        description: {
                            [sequelize_1.Op.like]: `%${query}%`,
                        },
                    },
                ]
            },
            attributes: {
                include: [
                    [
                        this.favouriteEntity.isUserFavouriteQuery({
                            userId: user.id,
                            column: `${this.productEntity.name}.id`
                        }),
                        'isFavorite'
                    ],
                ],
            },
        });
    }
    async delete(productId) {
        const deleteProductAccessories = await this.productImages.destroy({
            where: {
                id: productId
            },
        });
        const deleteProductSpecs = await this.productSpecs.destroy({
            where: {
                id: productId
            },
        });
        if (deleteProductSpecs && deleteProductAccessories) {
            const deleteProduct = this.productEntity.destroy({
                where: {
                    id: productId
                },
            });
        }
        return [deleteProductAccessories, deleteProductAccessories];
    }
    async addConfirmTime(productId) {
        const product = await this.productEntity.findOne({
            where: {
                id: productId,
            }
        });
    }
};
ProductsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PRODUCT_ENTITY')),
    __param(1, (0, common_1.Inject)('PRODUCT_IMAGE_ENTITY')),
    __param(2, (0, common_1.Inject)('PRODUCT_SPECS_ENTITY')),
    __param(3, (0, common_1.Inject)('PRODUCT_TYPE_ENTITY')),
    __param(4, (0, common_1.Inject)('USER_FAVOURITES_ENTITY')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], ProductsRepository);
exports.default = ProductsRepository;
//# sourceMappingURL=product.repository.js.map