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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const _ = require("lodash");
const encode_1 = require("../../Globals/providers/encode");
const encrypt_1 = require("../../Globals/providers/encrypt");
const users_otp_service_1 = require("../../Otp/services/users-otp.service");
const user_service_1 = require("../../Users/services/user.service");
let AuthService = class AuthService {
    constructor(cryptoEncrypt, encode, userService, otpService) {
        this.cryptoEncrypt = cryptoEncrypt;
        this.encode = encode;
        this.userService = userService;
        this.otpService = otpService;
    }
    async signIn(payload) {
        const user = await this.userService.find(payload);
        if (!user) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.UNAUTHORIZED,
                name: 'UNAUTHORIZED',
                error: 'Invalid User or Password',
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
        const hash = this.cryptoEncrypt.hashPassword(payload.password);
        const match = this.cryptoEncrypt.comparePassword(hash, user.password);
        if (!match) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.UNAUTHORIZED,
                name: 'UNAUTHORIZED',
                error: 'Invalid User or Password',
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
        const token = this.encode.sign({
            id: user.id,
            role: user.role,
        });
        return _.omit(Object.assign(Object.assign({}, user.dataValues), { isCompleted: Object.values(user.dataValues).every(props => props !== null && props !== ''), token }), [
            'password',
            'homeAddress',
            'city',
            'state',
            'validId',
            'income',
            'schoolName',
            'matricNo',
            'natureOfBusiness',
            'roleInCompany',
            'registrationNo',
            'companyLocation'
        ]);
    }
    async signUp(payload) {
        const userExist = await this.userService.create(payload);
        if (!userExist) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.FOUND,
                name: 'UserExists',
                error: 'User already exist',
            }, common_1.HttpStatus.FOUND);
        }
        return userExist;
    }
    async forgotPassword(payload) {
        const user = await this.userService.find(payload);
        if (!user) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                name: 'NotFound',
                error: 'Invalid User',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return await this.otpService.generateOtp(user);
    }
    async resetPassword(payload) {
        const user = await this.userService.find(payload);
        if (!user) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.NOT_FOUND,
                name: 'NotFound',
                error: 'Invalid User',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        const isValid = await this.otpService.verifyOtp({
            token: payload.token,
            secretReference: payload.secretReference,
        });
        if (!isValid) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                name: 'Forbidden',
                error: 'Invalid or Expired Token',
            }, common_1.HttpStatus.FORBIDDEN);
        }
        return (await this.userService.resetPassword(payload))
            ? { messge: 'Password successfully updated' }
            : new common_1.HttpException('Password not updated', common_1.HttpStatus.FORBIDDEN);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [encrypt_1.CryptoEncrypt,
        encode_1.Encode,
        user_service_1.UserService,
        users_otp_service_1.UserOtpService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map