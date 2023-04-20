"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitlistSchema = exports.WaitlistDto = void 0;
const Joi = require("joi");
class WaitlistDto {
}
exports.WaitlistDto = WaitlistDto;
exports.waitlistSchema = Joi.object().keys({
    email: Joi.string().email().required()
});
//# sourceMappingURL=waitlist.dto.js.map