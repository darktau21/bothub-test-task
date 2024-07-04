import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { AppConfigModule } from '../config/config.module';
import { PrismaModule } from '../prisma/prisma.module';
import { RedisModule } from '../redis/redis.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [PrismaModule, AppConfigModule, UserModule, AuthModule, RedisModule],
})
export class AppModule {}