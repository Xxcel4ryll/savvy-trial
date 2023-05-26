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
exports.BrandService = void 0;
const common_1 = require("@nestjs/common");
const brand_repository_1 = require("../repositories/brand.repository");
const providers_1 = require("../../Database/providers");
const sequelize = providers_1.databaseProviders[0].useFactory();
let BrandService = class BrandService {
    constructor(brandRepository) {
        this.brandRepository = brandRepository;
    }
    async find(query) {
        return this.brandRepository.find(query);
    }
    async create(payload) {
        const transaction = (await sequelize).transaction();
        try {
            const [brand, created] = await this.brandRepository.create(payload);
            if (created) {
                throw 'Brand already created!';
            }
            return brand;
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
};
BrandService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [brand_repository_1.default])
], BrandService);
exports.BrandService = BrandService;
//# sourceMappingURL=Brand.service.js.map