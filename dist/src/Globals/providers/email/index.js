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
exports.Email = void 0;
const common_1 = require("@nestjs/common");
const Path = require("path");
const fs = require("fs");
const Template7 = require('template7');
const nodemailer_1 = require("./nodemailer");
let Email = class Email {
    constructor() {
        this.emailProvider = new nodemailer_1.default();
        this.emailProvider = new nodemailer_1.default();
    }
    async send(templateName, options) {
        console.log(`Sending email - template - ${templateName} - options - ${options}`);
        const { context } = options || {};
        const html = this.html(templateName, context);
        try {
            await this.emailProvider.send(html, options);
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.SERVICE_UNAVAILABLE,
                name: 'InternalServerError',
                error: 'Oops! An error occured while sending email',
            }, common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
    }
    html(templateName, context) {
        const pathToTemplate = Path.resolve(__dirname, `templates/${templateName}.html`);
        const content = fs.readFileSync(pathToTemplate).toString('utf-8');
        const compiled = Template7(content).compile();
        return compiled(context);
    }
};
Email = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], Email);
exports.Email = Email;
//# sourceMappingURL=index.js.map