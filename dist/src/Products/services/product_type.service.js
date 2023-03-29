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
exports.ProductTypeService = void 0;
const common_1 = require("@nestjs/common");
const product_type_repository_1 = require("../repositories/product_type.repository");
const product_repository_1 = require("../repositories/product.repository");
let ProductTypeService = class ProductTypeService {
    constructor(products, productTypeRepository) {
        this.products = products;
        this.productTypeRepository = productTypeRepository;
    }
    async find(query) {
        const { rows } = await this.productTypeRepository.find(query);
        const productTypesWithProducts = await Promise.all(rows.map(async (productType) => {
            const { rows: products } = await this.products.find({
                limit: 30,
                offset: 0,
                productTypeId: productType.id
            });
            return Object.assign(Object.assign({}, productType.dataValues), { products });
        }));
        return productTypesWithProducts;
    }
    async create(payload) {
        const [productType, created] = await this.productTypeRepository.create(payload);
        if (created) {
            return productType;
        }
        throw new common_1.HttpException({
            statusCode: common_1.HttpStatus.PRECONDITION_FAILED,
            name: 'PRODUCT_TYPE',
            error: 'Already Created',
        }, common_1.HttpStatus.PRECONDITION_FAILED);
    }
};
ProductTypeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_repository_1.default,
        product_type_repository_1.default])
], ProductTypeService);
exports.ProductTypeService = ProductTypeService;
//# sourceMappingURL=product_type.service.js.map