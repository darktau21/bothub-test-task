import type { Response } from 'express';

import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  type ExceptionFilter,
  type HttpException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { InvalidRefreshTokenError, PasswordCompareError } from '../errors';

@Catch(PrismaClientKnownRequestError, PasswordCompareError, InvalidRefreshTokenError)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: PasswordCompareError | PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let error: HttpException;

    if (exception instanceof PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          error = new ConflictException('User already exists');
          break;
        case 'P2025':
          error = new BadRequestException('Invalid credentials');
          break;
        default:
          error = new InternalServerErrorException('Internal server error');
      }
    }

    if (exception instanceof PasswordCompareError) {
      error = new BadRequestException('Invalid credentials');
    }

    if (exception instanceof InvalidRefreshTokenError) {
      error = new UnauthorizedException(exception.message);
    }

    response.status(error.getStatus()).json(error.getResponse());
  }
}
