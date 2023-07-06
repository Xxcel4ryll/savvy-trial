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
const common_1 = require("@nestjs/common");
let UserRepository = class UserRepository {
    constructor(userEntity) {
        this.userEntity = userEntity;
    }
    findByEmail(email) {
        return this.userEntity.findOne({
            where: {
                email,
            }
        });
    }
    findByPhone(phoneNumber) {
        return this.userEntity.findOne({
            where: {
                phoneNumber,
            },
            attributes: [
                'id',
                'firstName',
                'lastName',
                'phoneNumber',
                'password',
                'userType',
                'role',
                'profilePicture',
            ]
        });
    }
    findById(id) {
        return this.userEntity.findOne({
            where: {
                id,
            },
        });
    }
    create(payload) {
        return this.userEntity.findOrCreate({
            where: {
                email: payload.email,
            },
            defaults: Object.assign(Object.assign({}, payload), { status: payload.userType === 'ADMIN' ?
                    'PENDING' : 'VERIFIED' }),
            raw: true,
        });
    }
    modify(criteriaObj, updates) {
        return this.userEntity.update(updates, {
            where: criteriaObj,
        });
    }
    getUsers(type) {
        return this.userEntity.findAndCountAll({
            where: {
                userType: type
            },
            attributes: [
                'id',
                'email',
                'firstName',
                'lastName',
                'phoneNumber',
                'countryCode',
                'profilePicture',
                'userType',
                'status',
                'createdAt'
            ]
        });
    }
    delete(criteriaObj) {
        return this.userEntity.destroy({
            where: criteriaObj,
        });
    }
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_ENTITY')),
    __metadata("design:paramtypes", [Object])
], UserRepository);
exports.default = UserRepository;
//# sourceMappingURL=user.repository.js.map