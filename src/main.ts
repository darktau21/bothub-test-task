import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';
import { JwtAuthGuard } from './auth/guards';
import { RequiredPermissionGuard } from './auth/guards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    defaultVersion: '/v1',
    prefix: 'api',
    type: VersioningType.URI,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  );
  app.useGlobalGuards(
    new JwtAuthGuard(app.get(Reflector)),
    new RequiredPermissionGuard(app.get(Reflector))
  );
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
      strategy: 'exposeAll',
    })
  );

  app.use(cookieParser());

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
