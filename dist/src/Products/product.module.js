"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const product_controller_1 = require("./controllers/product.controller");
const product_provider_1 = require("./providers/product.provider");
const product_repository_1 = require("./repositories/product.repository");
const product_service_1 = require("./services/product.service");
const product_type_controller_1 = require("./controllers/product_type.controller");
const product_type_repository_1 = require("./repositories/product_type.repository");
const product_images_repository_1 = require("./repositories/product_images.repository");
const product_specifications_repository_1 = require("./repositories/product_specifications.repository");
const product_type_service_1 = require("./services/product_type.service");
const transaction_module_1 = require("../Transactions/transaction.module");
const user_module_1 = require("../Users/user.module");
const brand_controller_1 = require("./controllers/brand.controller");
const brand_service_1 = require("./services/brand.service");
const brand_repository_1 = require("./repositories/brand.repository");
const product_accessories_repository_1 = require("./repositories/product_accessories.repository");
const file_module_1 = require("../Files/file.module");
let ProductModule = class ProductModule {
};
ProductModule = __decorate([
    (0, common_1.Module)({
        controllers: [product_controller_1.ProductController, brand_controller_1.BrandController, product_type_controller_1.ProductTypeController],
        providers: [
            product_service_1.ProductService,
            brand_service_1.BrandService,
            product_type_service_1.ProductTypeService,
            product_repository_1.default,
            brand_repository_1.default,
            product_type_repository_1.default,
            product_images_repository_1.default,
            product_specifications_repository_1.default,
            product_accessories_repository_1.default,
            ...product_provider_1.ProductProviders,
        ],
        exports: [
            product_service_1.ProductService,
            product_type_service_1.ProductTypeService,
            product_repository_1.default,
            product_accessories_repository_1.default,
            ...product_provider_1.ProductProviders,
        ],
        imports: [
            file_module_1.FileModule,
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => transaction_module_1.TransactionModule)
        ]
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map