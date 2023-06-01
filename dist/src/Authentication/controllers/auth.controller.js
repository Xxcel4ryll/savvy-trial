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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../services/auth.service");
const validate_pipe_1 = require("../../Globals/providers/validate/validate.pipe");
const index_1 = require("../dtos/index");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    status() {
        return {
            status: true,
            message: 'Savvy backend alright'
        };
    }
    signIn(auth) {
        return this.authService.signIn(auth);
    }
    register(auth) {
        return this.authService.signUp(auth);
    }
    createAdmin(auth) {
        return this.authService.signUp(auth);
    }
    forgot(auth) {
        return this.authService.forgotPassword(auth);
    }
    reset(auth) {
        return this.authService.resetPassword(auth);
    }
};
__decorate([
    (0, common_1.Post)('status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "status", null);
__decorate([
    (0, common_1.UsePipes)(new validate_pipe_1.JoiValidationPipe(index_1.loginSchema)),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [index_1.LoginDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.UsePipes)(new validate_pipe_1.JoiValidationPipe(index_1.registerSchema)),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [index_1.RegisterDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.UsePipes)(new validate_pipe_1.JoiValidationPipe(index_1.registerSchema)),
    (0, common_1.Post)('admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [index_1.RegisterDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "createAdmin", null);
__decorate([
    (0, common_1.UsePipes)(new validate_pipe_1.JoiValidationPipe(index_1.forgotPasswordSchema)),
    (0, common_1.Post)('forgot'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [index_1.FindUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "forgot", null);
__decorate([
    (0, common_1.UsePipes)(new validate_pipe_1.JoiValidationPipe(index_1.resetPasswordSchema)),
    (0, common_1.Post)('reset'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [index_1.ResetPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "reset", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map