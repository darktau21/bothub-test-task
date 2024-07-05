import type { Response } from 'express';

import {
  type ArgumentsHost,
  BadRequestException,
  Catch,
  type ExceptionFilter,
  type HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(PrismaClientKnownRequestError)
export class UserExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let error: HttpException;

    switch (exception.code) {
      case 'P2025':
        error = new BadRequestException('User with provided id does not exist');
        break;
      default:
        error = new InternalServerErrorException('Internal server error');
    }

    response.status(error.getStatus()).json(error.getResponse());
  }
}
