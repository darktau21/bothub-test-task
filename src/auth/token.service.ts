import type { Role } from '@prisma/client';

import { AppConfigService } from '@/config/config.service';
import { RedisService } from '@/redis/redis.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 } from 'uuid';

import type { IJwtTokenData } from './interfaces';

import { InvalidRefreshTokenError } from './errors';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly configService: AppConfigService
  ) {}

  private async generateAccessToken(jwtData: IJwtTokenData) {
    return this.jwtService.signAsync(jwtData);
  }

  private async generateRefreshToken(userId: number) {
    const token = v4();
    await this.redisService.set(token, userId);
    await this.redisService.expire(token, this.configService.get('REFRESH_TOKEN_EXPIRATION_TIME'));
    return token;
  }

  async deleteRefreshToken(token: string) {
    await this.redisService.del(token);
  }

  async generateTokens(id: number, role: Role) {
    const accessToken = await this.generateAccessToken({ id, role });
    const refreshToken = await this.generateRefreshToken(id);
    return { accessToken, refreshToken };
  }

  async verifyRefreshToken(token: string) {
    const userId = +(await this.redisService.get(token));
    if (!userId) {
      throw new InvalidRefreshTokenError('Refresh token expired');
    }
    return userId;
  }
}
