import { AppConfigService } from '@/config/config.service';
import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TokenService } from './token.service';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRATION_TIME'),
        },
      }),
    }),
  ],
  providers: [AuthService, TokenService, JwtAuthGuard, JwtStrategy],
})
export class AuthModule {}
