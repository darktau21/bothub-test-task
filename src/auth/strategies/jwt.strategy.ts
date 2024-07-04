import { AppConfigService } from '@/config/config.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import type { IJwtTokenData } from '../interfaces';

import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService,
    configService: AppConfigService
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    } satisfies StrategyOptions);
  }

  async validate(payload: IJwtTokenData) {
    const user = await this.authService.validate(payload.id);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return payload;
  }
}
