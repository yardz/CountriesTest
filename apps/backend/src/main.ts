if (!process.env.IS_TS_NODE) {
  // eslint-disable-next-line global-require, @typescript-eslint/no-require-imports
  require('module-alias/register');
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });

  if (process.env.NODE_ENV === 'development') {
    app.enableCors({
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Accept',
      credentials: true,
    });
  }

  app.use(cookieParser());

  await app.listen(8080);
}
bootstrap();
