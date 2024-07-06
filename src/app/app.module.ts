import { type MiddlewareConsumer, Module, type NestModule } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { AuthModule } from '../auth/auth.module';
import { BookModule } from '../book/book.module';
import { AppConfigModule } from '../config/config.module';
import { PrismaModule } from '../prisma/prisma.module';
import { RedisModule } from '../redis/redis.module';
import { UserModule } from '../user/user.module';
import { APP_PROVIDERS } from './app.providers';

@Module({
  imports: [PrismaModule, AppConfigModule, UserModule, AuthModule, RedisModule, BookModule],
  providers: APP_PROVIDERS,
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
