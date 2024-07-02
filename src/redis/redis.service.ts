import { AppConfigService } from '@/config/config.service';
import { Injectable, type OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
  constructor(configService: AppConfigService) {
    super({
      db: configService.get('REDIS_DB'),
      host: configService.get('REDIS_HOST'),
      password: configService.get('REDIS_PASSWORD'),
      port: configService.get('REDIS_PORT'),
    });
  }

  onModuleDestroy() {
    this.quit();
  }
}
