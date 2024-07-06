import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    defaultVersion: '/v1',
    prefix: 'api',
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .addBearerAuth({
      description: 'Введите access token в поле в виде "Bearer {токен}"',
      in: 'header',
      name: 'Authorization',
      type: 'apiKey',
    })
    .setTitle('BotHub')
    .setDescription('Документация по api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.APP_PORT);
}
bootstrap();
