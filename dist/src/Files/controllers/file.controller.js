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
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const file_service_1 = require("../services/file.service");
const role_guard_1 = require("../../Globals/Guards/role.guard");
const role_enum_1 = require("../../Globals/role.enum");
let FilesController = class FilesController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async handleUploadedFile(file) {
        const uploadedFile = await this.uploadService.handleUploadedFile(file);
        return {
            url: uploadedFile.url,
            width: uploadedFile.width,
            height: uploadedFile.height,
            format: uploadedFile.format,
            resource_type: uploadedFile.resource_type,
            created_at: uploadedFile.created_at,
        };
    }
    uploadFiles({ files }) {
        return this.uploadService.handleMultipleFiles(files);
    }
};
__decorate([
    (0, common_1.Post)('/upload'),
    (0, common_1.UseGuards)((0, role_guard_1.default)([role_enum_1.default.Admin, role_enum_1.default.User])),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "handleUploadedFile", null);
__decorate([
    (0, common_1.Post)('/upload/multiple'),
    (0, common_1.UseGuards)((0, role_guard_1.default)([role_enum_1.default.Admin, role_enum_1.default.User])),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'files', maxCount: 3 },
    ])),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FilesController.prototype, "uploadFiles", null);
FilesController = __decorate([
    (0, common_1.Controller)('files'),
    __metadata("design:paramtypes", [file_service_1.FileService])
], FilesController);
exports.FilesController = FilesController;
//# sourceMappingURL=file.controller.js.map