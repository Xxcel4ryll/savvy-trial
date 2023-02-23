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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const product_repository_1 = require("../repositories/product.repository");
const product_images_repository_1 = require("../repositories/product_images.repository");
const product_specifications_repository_1 = require("../repositories/product_specifications.repository");
const providers_1 = require("../../Database/providers");
const sequelize = providers_1.databaseProviders[0].useFactory();
let ProductService = class ProductService {
    constructor(purchasedProduct, productRepository, productImageRepository, productSpecsRepository) {
        this.purchasedProduct = purchasedProduct;
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
        this.productSpecsRepository = productSpecsRepository;
    }
    async find(query) {
        const { count, rows: products } = await this.productRepository.find(query);
        for (let product of products) {
            const images = await this.productImageRepository.find({
                productId: product.id
            });
            const specification = await this.productSpecsRepository.find({
                productId: product.id
            });
            product.dataValues['images'] = images;
            product.dataValues['specifications'] = specification;
        }
        return { count, products };
    }
    async create(payload) {
        const transaction = (await sequelize).transaction();
        try {
            const product = await this.productRepository.create(payload);
            const images = await this.productImageRepository.addImages(product.id, payload.images);
            const specifications = await this.productSpecsRepository.addSpecification(product.id, payload.specification);
            return Object.assign(Object.assign({}, product.dataValues), { images, specifications });
        }
        catch (error) {
            (await transaction).rollback();
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.PRECONDITION_FAILED,
                name: error.name,
                error: error.message,
            }, common_1.HttpStatus.PRECONDITION_FAILED);
        }
    }
    async update(payload) {
        const transaction = (await sequelize).transaction();
        try {
            const [product] = await this.productRepository.modify({
                id: payload.productId
            }, payload);
            if (payload === null || payload === void 0 ? void 0 : payload.images) {
                await this.productImageRepository.modify({
                    id: payload.productId
                }, payload.images);
            }
            if (payload === null || payload === void 0 ? void 0 : payload.specification) {
                await this.productSpecsRepository.modify({
                    id: payload.productId,
                }, payload.specification);
            }
            return !!product ? 'Product successfully updated!' :
                'Product failed to update';
        }
        catch (error) {
            (await transaction).rollback();
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.PRECONDITION_FAILED,
                name: error.name,
                error: error.message,
            }, common_1.HttpStatus.PRECONDITION_FAILED);
        }
    }
    async view(productId) {
        const product = await this.productRepository.check({
            id: productId
        });
        const images = await this.productImageRepository.find({
            productId: product.id
        });
        const specification = await this.productSpecsRepository.find({
            productId: product.id
        });
        console.log('oo');
        product['images'] = images;
        product['specifications'] = specification;
        return product;
    }
    async search(query) {
        const product = await this.productRepository.search(query);
        if (!product) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.PRECONDITION_FAILED,
                name: 'Product',
                error: 'Product not found',
            }, common_1.HttpStatus.PRECONDITION_FAILED);
        }
        const images = await this.productImageRepository.find({
            productId: product.id
        });
        const specification = await this.productSpecsRepository.find({
            productId: product.id
        });
        product.dataValues['images'] = images;
        product.dataValues['specifications'] = specification;
        return product;
    }
    productAvailability(products) {
        return Promise.all(products.map(async (product) => {
            const isProduct = await this.productRepository.check({
                id: product.id,
            });
            if (!isProduct) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.PRECONDITION_FAILED,
                    name: 'PRODUCT',
                    error: 'Out of stock',
                }, common_1.HttpStatus.PRECONDITION_FAILED);
            }
            if (product.quantity >= isProduct.quantity) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.PRECONDITION_FAILED,
                    name: 'PRODUCT',
                    error: `${isProduct.name} has ${isProduct.quantity} units left`,
                }, common_1.HttpStatus.PRECONDITION_FAILED);
            }
            return Object.assign(Object.assign({}, isProduct), { paidQuantity: product.quantity });
        }));
    }
    recordPurchasedProduct(products) {
        products.products.map(async (product) => {
            await this.purchasedProduct.create({
                transactionId: products.transactionId,
                paymentType: products.paymentType,
                userId: products.userId,
                productId: product.id,
                amount: product.price,
            });
            await this.productRepository.modify({
                id: product.id
            }, {
                quantity: parseInt(product.quantity) - parseInt(product.paidQuantity)
            });
        });
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PURCHASED_ENTITY')),
    __metadata("design:paramtypes", [Object, product_repository_1.default,
        product_images_repository_1.default,
        product_specifications_repository_1.default])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map