import type { Response } from 'express';

import { AppConfigService } from '@/config/config.service';
import { Cookies } from '@/shared/lib';
import { Body, Controller, Get, Post, Query, Res, UseFilters } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import type { IJwtTokenData } from './interfaces';

import { AuthService } from './auth.service';
import { COOKIE_TOKEN_NAME } from './const';
import { CurrentUserPayload, PublicRoute } from './decorators';
import { LoginRequest, RegisterRequest } from './dto/request';
import { LoginResponse, RegisterResponse } from './dto/response';
import { AuthExceptionFilter } from './filters';

const AUTH_CONTROLLER_ROUTE = '/users';

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

  @ApiOkResponse({ type: LoginResponse })
  @PublicRoute()
  @Post('/login')
  async login(
    @Body() { password, username }: LoginRequest,
    @Res({ passthrough: true }) res: Response
  ): Promise<LoginResponse> {
    const tokens = await this.authService.login(username, password);
    this.setCookieToken(tokens.refreshToken, res);
    return new LoginResponse({ token: tokens.accessToken });
  }

  @ApiOkResponse({ type: LoginResponse })
  @PublicRoute()
  @Get('/refresh')
  async refresh(
    @Res({ passthrough: true }) res: Response,
    @Cookies(COOKIE_TOKEN_NAME) refreshToken?: string
  ): Promise<LoginResponse> {
    const tokens = await this.authService.refresh(refreshToken);
    this.setCookieToken(tokens.refreshToken, res);
    return new LoginResponse({ token: tokens.accessToken });
  }

  @ApiOkResponse({ type: RegisterResponse })
  @PublicRoute()
  @Post('/register')
  async register(@Body() data: RegisterRequest): Promise<RegisterResponse> {
    const user = await this.authService.register(data);
    return new RegisterResponse(user);
  }

  @ApiOkResponse({ type: RegisterResponse })
  @Get('/verify')
  async verify(
    @Query('token') verificationCode: string,
    @CurrentUserPayload() payload: IJwtTokenData
  ): Promise<RegisterResponse> {
    const user = await this.authService.verifyEmail(payload.id, verificationCode);
    return new RegisterResponse(user);
  }
}
