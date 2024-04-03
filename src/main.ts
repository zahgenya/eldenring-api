import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getBodyParserOptions } from '@nestjs/platform-express/adapters/utils/get-body-parser-options.util';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {bodyParser: false});
  app.use(json(getBodyParserOptions(true, { limit: '25mb' })));
  await app.listen(3000);
}
bootstrap();
