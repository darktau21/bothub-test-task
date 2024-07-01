import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configSchema } from './config.schema';
import { AppConfigService } from './config.service';

@Global()
@Module({
  exports: [AppConfigService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: false,
      validationOptions: {
        abortEarly: true,
      },
      validationSchema: configSchema,
    }),
  ],
  providers: [AppConfigService],
})
export class AppConfigModule {}
