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
exports.WaitlistService = void 0;
const common_1 = require("@nestjs/common");
const waitlist_repository_1 = require("../repositories/waitlist.repository");
const email_1 = require("../../Globals/providers/email");
const providers_1 = require("../../Database/providers");
const DB = providers_1.databaseProviders[0].useFactory();
let WaitlistService = class WaitlistService {
    constructor(waitlistRepository, Email) {
        this.waitlistRepository = waitlistRepository;
        this.Email = Email;
    }
    find(query) {
        return this.waitlistRepository.find(query);
    }
    async create(payload) {
        const transaction = (await DB).transaction();
        try {
            const [waitlist, created] = await this.waitlistRepository.create(payload, transaction);
            if (!created) {
                throw 'You already joined';
            }
            this.Email.send('waitlist', {
                fromName: 'Savvy Africa',
                fromId: 'admin@savvy.africa',
                subject: 'Waitlist',
                to: waitlist.email,
                context: {
                    name: payload.name,
                },
            });
            (await transaction).commit();
            return waitlist;
        }
        catch (err) {
            (await transaction).rollback();
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.PRECONDITION_FAILED,
                name: 'WAITLIST',
                error: err,
            }, common_1.HttpStatus.PRECONDITION_FAILED);
        }
    }
};
WaitlistService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [waitlist_repository_1.default,
        email_1.Email])
], WaitlistService);
exports.WaitlistService = WaitlistService;
//# sourceMappingURL=waitlist.service.js.map