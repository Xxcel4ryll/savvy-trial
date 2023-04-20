"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitListModule = void 0;
const common_1 = require("@nestjs/common");
const waitlist_provider_1 = require("./providers/waitlist.provider");
const waitlist_controller_1 = require("./controllers/waitlist.controller");
const waitlist_service_1 = require("./services/waitlist.service");
const waitlist_repository_1 = require("./repositories/waitlist.repository");
let WaitListModule = class WaitListModule {
};
WaitListModule = __decorate([
    (0, common_1.Module)({
        controllers: [waitlist_controller_1.WaitlistController],
        providers: [waitlist_service_1.WaitlistService, waitlist_repository_1.default, ...waitlist_provider_1.WaitListProviders],
        exports: [waitlist_service_1.WaitlistService, waitlist_repository_1.default, ...waitlist_provider_1.WaitListProviders],
    })
], WaitListModule);
exports.WaitListModule = WaitListModule;
//# sourceMappingURL=wailtlist.module.js.map