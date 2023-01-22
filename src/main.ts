import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const appConfig = require('../core/config');

(async () => {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: '*',
  });
  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(appConfig.port);
})();
