"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductProviders = void 0;
const product_entity_1 = require("../entities/product.entity");
const product_type_entity_1 = require("../entities/product_type.entity");
const product_price_entity_1 = require("../entities/product_price.entity");
const product_images_entity_1 = require("../entities/product_images.entity");
const product_specification_entity_1 = require("../entities/product_specification.entity");
const brand_entity_1 = require("../entities/brand.entity");
const product_accessories_entity_1 = require("../entities/product_accessories.entity");
exports.ProductProviders = [
    {
        provide: 'PRODUCT_ENTITY',
        useValue: product_entity_1.default,
    },
    {
        provide: 'PRODUCT_TYPE_ENTITY',
        useValue: product_type_entity_1.default,
    },
    {
        provide: 'PRODUCT_PRICE_ENTITY',
        useValue: product_price_entity_1.default,
    },
    {
        provide: 'PRODUCT_IMAGE_ENTITY',
        useValue: product_images_entity_1.default,
    },
    {
        provide: 'PRODUCT_SPECS_ENTITY',
        useValue: product_specification_entity_1.default,
    },
    {
        provide: 'BRAND_ENTITY',
        useValue: brand_entity_1.default,
    },
    {
        provide: 'PRODUCT_ACCESSORY_ENTITY',
        useValue: product_accessories_entity_1.default,
    },
];
//# sourceMappingURL=product.provider.js.map