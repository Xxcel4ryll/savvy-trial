"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const cloudinary_1 = require("cloudinary");
const config = require('../../../core/config');
exports.CloudinaryProvider = {
    provide: 'CLOUDINARY',
    useFactory: () => {
        return cloudinary_1.v2.config({
            cloud_name: config.file.cloud_name,
            api_key: config.file.api_key,
            api_secret: config.file.api_secret,
        });
    },
};
//# sourceMappingURL=file.provider.js.map