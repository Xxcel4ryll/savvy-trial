"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const appConfig = require('../core/config');
(async () => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api/v1');
    app.enableCors({
        origin: '*',
    });
    await app.listen(appConfig.port);
})();
//# sourceMappingURL=main.js.map