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
exports.WaitlistController = void 0;
const common_1 = require("@nestjs/common");
const waitlist_service_1 = require("../services/waitlist.service");
const index_1 = require("../dtos/index");
const validate_pipe_1 = require("../../Globals/providers/validate/validate.pipe");
let WaitlistController = class WaitlistController {
    constructor(waitlistService) {
        this.waitlistService = waitlistService;
    }
    getWaitlists(req) {
        return this.waitlistService.find(req.query);
    }
    createWaitlist(Waitlist) {
        return this.waitlistService.create(Waitlist);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WaitlistController.prototype, "getWaitlists", null);
__decorate([
    (0, common_1.UsePipes)(new validate_pipe_1.JoiValidationPipe(index_1.waitlistSchema)),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [index_1.WaitlistDto]),
    __metadata("design:returntype", void 0)
], WaitlistController.prototype, "createWaitlist", null);
WaitlistController = __decorate([
    (0, common_1.Controller)('waitlist'),
    __metadata("design:paramtypes", [waitlist_service_1.WaitlistService])
], WaitlistController);
exports.WaitlistController = WaitlistController;
//# sourceMappingURL=waitlist.controller.js.map