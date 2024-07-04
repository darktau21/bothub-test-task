import type { Response } from 'express';

import { AppConfigService } from '@/config/config.service';
import { Cookies } from '@/shared/lib';
import { Body, Controller, Get, Post, Res, UseFilters } from '@nestjs/common';

import { AuthService } from './auth.service';
import { COOKIE_TOKEN_NAME } from './const';
import { PublicRoute } from './decorators';
import { LoginRequest, RegisterRequest } from './dto/request';
import { LoginResponse, RegisterResponse } from './dto/response';
import { AuthExceptionFilter } from './filters';

const AUTH_CONTROLLER_ROUTE = '/users';

@PublicRoute()
@UseFilters(AuthExceptionFilter)
@Controller(AUTH_CONTROLLER_ROUTE)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: AppConfigService
  ) {}

  private setCookieToken(token: string, res: Response) {
    res.cookie(COOKIE_TOKEN_NAME, token, {
      httpOnly: true,
      maxAge: this.configService.get('REFRESH_TOKEN_EXPIRATION_TIME') * 1000,
      sameSite: 'strict',
      secure: this.configService.get('NODE_ENV') === 'production',
    });
  }

  @Post('/login')
  async login(
    @Body() { password, username }: LoginRequest,
    @Res({ passthrough: true }) res: Response
  ): Promise<LoginResponse> {
    const tokens = await this.authService.login(username, password);
    this.setCookieToken(tokens.refreshToken, res);
    return new LoginResponse({ token: tokens.accessToken });
  }

  @Get('/refresh')
  async refresh(
    @Res({ passthrough: true }) res: Response,
    @Cookies(COOKIE_TOKEN_NAME) refreshToken?: string
  ): Promise<LoginResponse> {
    const tokens = await this.authService.refresh(refreshToken);
    this.setCookieToken(tokens.refreshToken, res);
    return new LoginResponse({ token: tokens.accessToken });
  }

  @Post('/register')
  async register(@Body() data: RegisterRequest): Promise<RegisterResponse> {
    const user = await this.authService.register(data);
    return new RegisterResponse(user);
  }
}
