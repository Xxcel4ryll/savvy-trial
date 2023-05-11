"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const common_1 = require("@nestjs/common");
const chalk = require("chalk");
let Logger = class Logger {
    static logg(opts, ...otherArgs) {
        const bgHex = {
            info: '#007bff',
            danger: '#dc3545',
            success: '#098426',
            redisY: '#FF8800',
            redisN: '#DEADED',
            googleDataY: '#000080',
            googleDataN: '#CD5C5C',
            mongo: '#1c6878',
            response: '#569c2d',
        };
        if (process.env.LOGGING) {
            console.info(chalk
                .hex('#ffffff')
                .bgHex(bgHex[opts.type] || 'info')
                .bold.apply(null, [
                `\n ${opts.message || opts} `,
                opts.err,
                ...otherArgs,
            ]));
        }
    }
};
Logger = __decorate([
    (0, common_1.Injectable)()
], Logger);
exports.Logger = Logger;
//# sourceMappingURL=index.js.map