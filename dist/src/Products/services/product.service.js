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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const product_repository_1 = require("../repositories/product.repository");
const product_images_repository_1 = require("../repositories/product_images.repository");
const product_specifications_repository_1 = require("../repositories/product_specifications.repository");
const providers_1 = require("../../Database/providers");
const sequelize = providers_1.databaseProviders[0].useFactory();
let ProductService = class ProductService {
    constructor(productRepository, productImageRepository, productSpecsRepository) {
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
            const images = await this.productImageRepository.modify({
                id: payload.productId
            }, payload.images);
            const specifications = await this.productSpecsRepository.modify({
                id: payload.productId,
            }, payload.specification);
            if (product) {
                return 'Product successfully updated!';
            }
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
        product.dataValues['images'] = images;
        product.dataValues['specifications'] = specification;
        return product;
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_repository_1.default,
        product_images_repository_1.default,
        product_specifications_repository_1.default])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map