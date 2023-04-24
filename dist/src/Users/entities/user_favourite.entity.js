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
let UserFavourite = class UserFavourite extends sequelize_typescript_1.Model {
    static isUserFavouriteQuery({ userId, column }) {
        const query = `(
      SELECT CASE WHEN EXISTS (
        SELECT user_id FROM user_favourites 
        WHERE ${this.tableName}.user_id = "${userId}" 
        AND ${this.tableName}.product_id = ${column}
        LIMIT 1
      )
      THEN TRUE
      ELSE FALSE END
      )`;
        return sequelize_typescript_1.Sequelize.literal(query);
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
], UserFavourite.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => product_entity_1.default),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], UserFavourite.prototype, "productId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => product_entity_1.default),
    __metadata("design:type", product_entity_1.default)
], UserFavourite.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        allowNull: false,
    }),
    __metadata("design:type", String)
], UserFavourite.prototype, "userId", void 0);
UserFavourite = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        underscored: true,
        tableName: 'user_favourites',
    })
], UserFavourite);
exports.default = UserFavourite;
//# sourceMappingURL=user_favourite.entity.js.map