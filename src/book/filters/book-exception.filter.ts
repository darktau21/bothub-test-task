import type { Response } from 'express';

import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  type ExceptionFilter,
  type HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(PrismaClientKnownRequestError)
export class BookExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let error: HttpException;

    if (exception instanceof PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2025':
          error = new NotFoundException('Book not found');
          break;
        default:
          error = new InternalServerErrorException('Internal server error');
      }
    }

    response.status(error.getStatus()).json(error.getResponse());
  }
}
