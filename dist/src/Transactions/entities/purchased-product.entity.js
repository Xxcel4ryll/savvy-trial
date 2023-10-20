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
const sequelize_typescript_1 = require("sequelize-typescript");
const product_entity_1 = require("../../Products/entities/product.entity");
const user_entity_1 = require("../../Users/entities/user.entity");
let PurchasedProduct = class PurchasedProduct extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], PurchasedProduct.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], PurchasedProduct.prototype, "transactionId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], PurchasedProduct.prototype, "paymentType", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_entity_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], PurchasedProduct.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_entity_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], PurchasedProduct.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.FLOAT,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], PurchasedProduct.prototype, "amount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM,
        values: ['confirmed', 'shipped', 'processing'],
        defaultValue: 'processing',
        allowNull: false,
    }),
    __metadata("design:type", String)
], PurchasedProduct.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_entity_1.default, {
        foreignKey: 'product_id',
        targetKey: 'id',
        as: 'products'
    }),
    __metadata("design:type", product_entity_1.default)
], PurchasedProduct.prototype, "products", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_entity_1.default, {
        foreignKey: 'user_id',
        targetKey: 'id',
        as: 'users'
    }),
    __metadata("design:type", user_entity_1.default)
], PurchasedProduct.prototype, "users", void 0);
PurchasedProduct = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        underscored: true,
        tableName: 'purchased_products',
    })
], PurchasedProduct);
exports.default = PurchasedProduct;
//# sourceMappingURL=purchased-product.entity.js.map