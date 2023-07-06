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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../services/user.service");
const index_1 = require("../dtos/index");
const validate_pipe_1 = require("../../Globals/providers/validate/validate.pipe");
const role_enum_1 = require("../../Globals/role.enum");
const role_guard_1 = require("../../Globals/Guards/role.guard");
const dtos_1 = require("../../Products/dtos");
const platform_express_1 = require("@nestjs/platform-express");
const dtos_2 = require("../../Authentication/dtos");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getUser(req) {
        return req.user;
    }
    updateUser(req, updateInfo) {
        return this.userService.updateAccount(req, updateInfo);
    }
    updateUserProfile(req, updateInfo) {
        return this.userService.updateUserProfile(req, updateInfo);
    }
    updatePassword(req, passwordInfo) {
        return this.userService.updatePassword(req, passwordInfo);
    }
    updateUserImage(req, file) {
        return this.userService.updateImage(req, file);
    }
    favoriteProduct({ user }, { productId }) {
        return this.userService.favoriteProduct(user, productId);
    }
    viewFavoriteProduct({ user }) {
        return this.userService.viewFavoriteProduct(user);
    }
    removeFavoriteProduct({ user }, { productId }) {
        return this.userService.removeFavoriteProduct(user, productId);
    }
    getUsers({ type }) {
        return this.userService.getUsers(type);
    }
    createAdminUser(admin) {
        return this.userService.createAdminUser(admin);
    }
    deleteAdmin({ userId }) {
        return this.userService.deleteAdmin(userId);
    }
    updateAdminStatus({ userId, status }) {
        return this.userService.updateAdminStatus(userId, status);
    }
};
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.default)([role_enum_1.default.Admin, role_enum_1.default.User])),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.default)([role_enum_1.default.Admin, role_enum_1.default.User])),
    (0, common_1.UsePipes)(new validate_pipe_1.JoiValidationPipe(index_1.completeProfileSchema)),
    (0, common_1.Put)('account'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, index_1.UserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.default)([role_enum_1.default.Admin, role_enum_1.default.User])),
    (0, common_1.UsePipes)(new validate_pipe_1.JoiValidationPipe(index_1.profileUpdateSchema)),
    (0, common_1.Patch)('profile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, index_1.UserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUserProfile", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.default)([role_enum_1.default.Admin, role_enum_1.default.User])),
    (0, common_1.UsePipes)(new validate_pipe_1.JoiValidationPipe(index_1.updatePasswordSchema)),
    (0, common_1.Put)('password'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, index_1.UserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Put)('image'),
    (0, common_1.UseGuards)((0, role_guard_1.default)([role_enum_1.default.Admin, role_enum_1.default.User])),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("profilePicture")),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUserImage", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.default)([role_enum_1.default.Admin, role_enum_1.default.User])),
    (0, common_1.Post)('favourite'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dtos_1.ProductDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "favoriteProduct", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.default)([role_enum_1.default.Admin, role_enum_1.default.User])),
    (0, common_1.Get)('favourite'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "viewFavoriteProduct", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.default)([role_enum_1.default.Admin, role_enum_1.default.User])),
    (0, common_1.Delete)('favourite/:productId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dtos_1.ProductDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "removeFavoriteProduct", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.default)([role_enum_1.default.Admin])),
    (0, common_1.Get)(':type'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.default)([role_enum_1.default.Admin])),
    (0, common_1.Post)('admin'),
    __param(0, (0, common_1.Body)(new validate_pipe_1.JoiValidationPipe(dtos_2.adminRegisterSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [index_1.UserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createAdminUser", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.default)([role_enum_1.default.Admin])),
    (0, common_1.Delete)('admin/:userId'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteAdmin", null);
__decorate([
    (0, common_1.UseGuards)((0, role_guard_1.default)([role_enum_1.default.Admin])),
    (0, common_1.Patch)('admin/:userId/:status'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateAdminStatus", null);
UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map