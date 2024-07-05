import type { Prisma } from '@prisma/client';

import { MailService } from '@/mail/mail.service';
import { PrismaService } from '@/prisma/prisma.service';
import { asyncRandomBytes } from '@/shared/lib';
import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

import { InvalidRefreshTokenError, PasswordCompareError, VerificationCodeError } from './errors';
import { TokenService } from './token.service';

const SALT_ROUNDS = 2;
const CONFIRMATION_CODE_SIZE = 48;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService
  ) {}

  private async generateVerificationCode() {
    const bytes = await asyncRandomBytes(CONFIRMATION_CODE_SIZE / 2);
    return bytes.toString('hex');
  }

  private async sendVerificationCode(email: string, code: string) {
    this.mailService.sendVerificationEmail(email, code);
  }

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
    const verificationCode = await this.generateVerificationCode();
    const user = await this.prisma.user.create({
      data: { ...data, password: hashedPassword, verificationCode },
    });
    await this.sendVerificationCode(user.email, verificationCode);
    return user;
  }

  async validate(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    return Boolean(user);
  }

  async verifyEmail(currentUserId: number, verificationCode: string) {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { verificationCode } });
    if (user.id !== currentUserId) {
      throw new VerificationCodeError();
    }
    return this.prisma.user.update({ data: { verified: true }, where: { id: user.id } });
  }
}
