import type { Prisma } from '@prisma/client';

import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

import { PasswordCompareError } from './errors/password-compare.error';
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
