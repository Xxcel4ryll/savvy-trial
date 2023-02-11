"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const cloudinary_1 = require("cloudinary");
exports.CloudinaryProvider = {
    provide: 'CLOUDINARY',
    useFactory: () => {
        return cloudinary_1.v2.config({
            cloud_name: 'duhx38bd0',
            api_key: '228737482825761',
            api_secret: 'f1PXE_s47Ai19xaW7YEhRxHgO_Q',
        });
    },
};
//# sourceMappingURL=file.provider.js.map