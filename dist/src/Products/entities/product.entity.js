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
const product_type_entity_1 = require("./product_type.entity");
const product_images_entity_1 = require("./product_images.entity");
const product_specification_entity_1 = require("./product_specification.entity");
const user_favourite_entity_1 = require("../../Users/entities/user_favourite.entity");
const product_accessories_entity_1 = require("./product_accessories.entity");
let Product = class Product extends sequelize_typescript_1.Model {
    get price() {
        var _a;
        return (_a = this.getDataValue('price')) === null || _a === void 0 ? void 0 : _a.toLocaleString();
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Product.prototype, "brand", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }),
    __metadata("design:type", Boolean)
], Product.prototype, "isVisible", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM,
        allowNull: false,
        values: ['RENT', 'BUY'],
    }),
    __metadata("design:type", String)
], Product.prototype, "salesOption", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_type_entity_1.default, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    }),
    __metadata("design:type", product_type_entity_1.default)
], Product.prototype, "productTypes", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_type_entity_1.default),
    (0, sequelize_typescript_1.Column)({
        allowNull: false,
    }),
    __metadata("design:type", String)
], Product.prototype, "productTypeId", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => product_images_entity_1.default, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Product.prototype, "images", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => product_specification_entity_1.default, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Product.prototype, "specifications", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => user_favourite_entity_1.default, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    }),
    __metadata("design:type", user_favourite_entity_1.default)
], Product.prototype, "userFavourite", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => product_accessories_entity_1.default, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Product.prototype, "accessories", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.FLOAT,
        allowNull: false,
    }),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], Product.prototype, "price", null);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: 1,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Product.prototype, "quantity", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Product.prototype, "overview", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM,
        allowNull: false,
        values: ['NEW', 'USED'],
    }),
    __metadata("design:type", String)
], Product.prototype, "label", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Product.prototype, "mainImage", void 0);
Product = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        underscored: true,
        tableName: 'products',
    })
], Product);
exports.default = Product;
//# sourceMappingURL=product.entity.js.map