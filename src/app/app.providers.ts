import { JwtAuthGuard, RequiredPermissionGuard } from '@/auth/guards';
import { ClassSerializerInterceptor, type Provider, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE, Reflector } from '@nestjs/core';

export const APP_PROVIDERS: Provider[] = [
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  },
  {
    inject: [Reflector],
    provide: APP_INTERCEPTOR,
    useFactory: (reflector: Reflector) =>
      new ClassSerializerInterceptor(reflector, {
        strategy: 'excludeAll',
      }),
  },
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
  {
    provide: APP_GUARD,
    useClass: RequiredPermissionGuard,
  },
];
