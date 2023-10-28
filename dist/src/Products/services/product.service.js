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
const product_type_repository_1 = require("../repositories/product_type.repository");
const providers_1 = require("../../Database/providers");
const _ = require("lodash");
const product_accessories_repository_1 = require("../repositories/product_accessories.repository");
const file_service_1 = require("../../Files/services/file.service");
const moment = require("moment");
const sequelize = providers_1.databaseProviders[0].useFactory();
let ProductService = class ProductService {
    constructor(purchasedProduct, productRepository, productTypeRepository, productImageRepository, productSpecsRepository, productAcessoryRepository, fileService) {
        this.purchasedProduct = purchasedProduct;
        this.productRepository = productRepository;
        this.productTypeRepository = productTypeRepository;
        this.productImageRepository = productImageRepository;
        this.productSpecsRepository = productSpecsRepository;
        this.productAcessoryRepository = productAcessoryRepository;
        this.fileService = fileService;
    }
    async find(user, query) {
        return this.productRepository.find(user, _.omit(query, ['category']));
    }
    async findAll(query) {
        return this.productRepository.findAll(query);
    }
    async create(user, payload, file) {
        console.log('running all image');
        if (file.mainImage && file.productImages) {
            let mainImageFile = file.mainImage[0];
            let productImages = file.productImages;
            var uploadMainImage = await this.fileService.handleUploadedFile(mainImageFile);
            var uploadProductImage = await this.fileService.handleMultipleFiles(productImages);
            payload.mainImage = uploadMainImage.url;
            var selectedProductImages;
            selectedProductImages = uploadProductImage === null || uploadProductImage === void 0 ? void 0 : uploadProductImage.map((e) => e.url);
        }
        else if (file.mainImage && file.productImages == null) {
            console.log('running only main image');
            let mainImageFile = file.mainImage[0];
            var uploadMainImage = await this.fileService.handleUploadedFile(mainImageFile);
            payload.mainImage = uploadMainImage.url;
        }
        else if (file.productImages && file.mainImage == null) {
            console.log('running only product image');
            let productImages = file.productImages;
            var uploadProductImage = await this.fileService.handleMultipleFiles(productImages);
            var selectedProductImages;
            selectedProductImages = uploadProductImage === null || uploadProductImage === void 0 ? void 0 : uploadProductImage.map((e) => e.url);
        }
        else {
            payload.mainImage == null,
                selectedProductImages = [];
        }
        payload.name = payload.title;
        const transaction = (await sequelize).transaction();
        try {
            let accessories;
            let specifications;
            const product = await this.productRepository.create(user, Object.assign({}, payload));
            if (selectedProductImages != null) {
                var images = await this.productImageRepository.addImages(product.id, selectedProductImages);
            }
            if (payload.specifications) {
                const savedspecifications = await this.productSpecsRepository.addSpecification(product.id, payload.specifications);
                specifications = savedspecifications;
            }
            if (payload.accessories) {
                const savedAccessories = await this.productAcessoryRepository.addAccessory(product.id, payload.accessories);
                accessories = savedAccessories;
            }
            return Object.assign(Object.assign({}, product.toJSON()), { images, specifications, accessories });
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
            const updates = _.omit(payload, ['productId']);
            const [product] = await this.productRepository.modify({
                id: payload.productId
            }, updates);
            if (payload === null || payload === void 0 ? void 0 : payload.images) {
                await this.productImageRepository.modify({
                    productId: payload.productId
                }, {
                    image: payload.images
                });
            }
            if (payload === null || payload === void 0 ? void 0 : payload.specification) {
                await this.productSpecsRepository.modify({
                    productId: payload.productId,
                }, payload.specification);
            }
            (await transaction).commit();
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
    async view(user, productId) {
        const product = await this.productRepository.check(user, { id: productId });
        const images = await this.productImageRepository.find({
            productId: product.id
        });
        const specification = await this.productSpecsRepository.find({
            productId: product.id
        });
        const accessories = await this.productAcessoryRepository.find({
            productId: product.id
        });
        const purchasedProduct = await this.purchasedProduct.findOne({
            where: {
                productId: product.id
            }
        });
        product.dataValues['images'] = images;
        product.dataValues['specifications'] = specification;
        product.dataValues['accessories'] = accessories;
        product.dataValues['purchasedProduct'] = purchasedProduct;
        return product;
    }
    async search(user, query) {
        const product = await this.productRepository.search(user, query);
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
            if (product.quantity >= isProduct.dataValues.quantity) {
                throw new common_1.HttpException({
                    statusCode: common_1.HttpStatus.PRECONDITION_FAILED,
                    name: 'PRODUCT',
                    error: `${isProduct.dataValues.name} has 
                ${isProduct.dataValues.quantity} units left`,
                }, common_1.HttpStatus.PRECONDITION_FAILED);
            }
            return Object.assign(Object.assign({}, isProduct.dataValues), { paidQuantity: product.quantity });
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
    async deleteProduct(productId) {
        return this.productRepository.delete(productId);
    }
    async addRentConfirmTime(productId, payload) {
        const product = await this.productRepository.findOne(productId);
        if (product.productType != "RENT") {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.PRECONDITION_FAILED,
                name: 'PRODUCT',
                error: `${product.name} is for ${product.productType}`,
            }, common_1.HttpStatus.PRECONDITION_FAILED);
        }
        else {
            return await this.productRepository.modify({
                id: product.id
            }, {
                rent_start_time: payload.rentStart || moment(),
            });
        }
    }
    async increaseProductQuantity(productId, payload) {
        const product = await this.productRepository.findOne(productId);
        if (!product) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.PRECONDITION_FAILED,
                name: 'PRODUCT',
                error: `Product not found`,
            }, common_1.HttpStatus.PRECONDITION_FAILED);
        }
        else {
            return await this.productRepository.modify({
                id: product.id
            }, {
                quantity: product.quantity += payload.quantity || 1
            });
        }
    }
    async singleProduct(productId) {
        const product = await this.productRepository.check({ id: productId });
        const images = await this.productImageRepository.find({
            productId: product.id
        });
        const specification = await this.productSpecsRepository.find({
            productId: product.id
        });
        const accessories = await this.productAcessoryRepository.find({
            productId: product.id
        });
        const purchasedProduct = await this.purchasedProduct.findOne({
            where: {
                productId: product.id
            }
        });
        product.dataValues['images'] = images;
        product.dataValues['specifications'] = specification;
        product.dataValues['accessories'] = accessories;
        product.dataValues['purchasedProduct'] = purchasedProduct;
        return product;
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PURCHASED_ENTITY')),
    __metadata("design:paramtypes", [Object, product_repository_1.default,
        product_type_repository_1.default,
        product_images_repository_1.default,
        product_specifications_repository_1.default,
        product_accessories_repository_1.default,
        file_service_1.FileService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map