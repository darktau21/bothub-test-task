import type { Prisma } from '@prisma/client';

import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

import { InvalidRefreshTokenError, PasswordCompareError } from './errors';
import { TokenService } from './token.service';

const SALT_ROUNDS = 2;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService
  ) {}

  async login(username: string, password: string) {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { username } });
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new PasswordCompareError();
    }

    const tokens = this.tokenService.generateTokens(user.id, user.role);
    return tokens;
  }

  async refresh(refreshToken?: string) {
    if (!refreshToken) {
      throw new InvalidRefreshTokenError();
    }

    const userId = await this.tokenService.verifyRefreshToken(refreshToken);
    await this.tokenService.deleteRefreshToken(refreshToken);
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: userId } });
    const tokens = this.tokenService.generateTokens(userId, user.role);
    return tokens;
  }

  async register({ password, ...data }: Prisma.UserCreateInput) {
    const hashedPassword = await hash(password, SALT_ROUNDS);
    const user = await this.prisma.user.create({ data: { ...data, password: hashedPassword } });
    return user;
  }

  async validate(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    return Boolean(user);
  }
}
