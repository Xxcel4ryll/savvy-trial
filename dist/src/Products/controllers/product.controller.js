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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("../services/product.service");
const index_1 = require("../dtos/index");
const validate_pipe_1 = require("../../Globals/providers/validate/validate.pipe");
const role_enum_1 = require("../../Globals/role.enum");
const role_guard_1 = require("../../Globals/Guards/role.guard");
const platform_express_1 = require("@nestjs/platform-express");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    getProducts(req) {
        return this.productService.find(req.user, req.query);
    }
    getAllProducts(req) {
        return this.productService.findAll(req.query);
    }
    createProduct(req, files, product) {
        return this.productService.create(req.user, product, files);
    }
    updateProduct(req, product) {
        return this.productService.update(product);
    }
    searchProduct(req) {
        return this.productService.search(req.user, req.query.search);
    }
    viewProduct(req, { productId }) {
        return this.productService.view(req.user, productId);
    }
    async deleteProduct({ productId }) {
        const data = await this.productService.deleteProduct(productId);
        return {
            message: `Product: ${productId} deleted succesfully`
        };
    }
};
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.default)([role_enum_1.default.Admin, role_enum_1.default.User])),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getProducts", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.default)([role_enum_1.default.Admin])),
    (0, common_1.Get)('admin'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.default)([role_enum_1.default.Admin, role_enum_1.default.User])),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'mainImage', maxCount: 1 },
        { name: 'productImages', maxCount: 4 },
    ])),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Body)(new validate_pipe_1.JoiValidationPipe(index_1.productSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, index_1.ProductDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.default)([role_enum_1.default.Admin, role_enum_1.default.User])),
    (0, common_1.UsePipes)(new validate_pipe_1.JoiValidationPipe(index_1.updateProductSchema)),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, index_1.ProductDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.default)([role_enum_1.default.Admin, role_enum_1.default.User])),
    (0, common_1.Get)('search/'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "searchProduct", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.default)([role_enum_1.default.Admin, role_enum_1.default.User])),
    (0, common_1.Get)(':productId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, index_1.ProductDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "viewProduct", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.default)([role_enum_1.default.Admin, role_enum_1.default.User])),
    (0, common_1.Delete)(':productId'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
ProductController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map