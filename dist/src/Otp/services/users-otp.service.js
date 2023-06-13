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
exports.UserOtpService = void 0;
const common_1 = require("@nestjs/common");
const otplib_1 = require("otplib");
const email_1 = require("../../Globals/providers/email");
const users_otp_repository_1 = require("../repositories/users-otp.repository");
const config = require('../../../core/config');
let UserOtpService = class UserOtpService {
    constructor(OtpRepository, Email) {
        this.OtpRepository = OtpRepository;
        this.Email = Email;
    }
    async generateOtp(user) {
        otplib_1.authenticator.options = {
            digits: config.otp.digits,
            step: config.otp.ttlSeconds,
        };
        const secret = otplib_1.authenticator.generateSecret();
        const token = otplib_1.authenticator.generate(secret);
        const { id } = await this.OtpRepository.saveSecret({
            secret,
            userId: user.id,
        });
        this.Email.send('otp', {
            fromName: 'Savvy Africa',
            fromId: 'info@rockapostolate.org',
            subject: 'Reset Pin OTP',
            to: user.email,
            context: {
                token,
            },
        });
        console.log(token);
        return { secretReference: id };
    }
    async verifyOtp({ token, secretReference }) {
        const found = await this.OtpRepository.findSecret({
            id: secretReference,
        });
        if (!found || !found.secret) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                name: 'InvalidReference',
                error: 'the reference passed in is invalid',
            }, common_1.HttpStatus.FORBIDDEN);
        }
        return otplib_1.authenticator.verify({ token, secret: found.secret });
    }
};
UserOtpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_otp_repository_1.default, email_1.Email])
], UserOtpService);
exports.UserOtpService = UserOtpService;
//# sourceMappingURL=users-otp.service.js.map