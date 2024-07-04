import type { Request } from 'express';

import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUserPayload = createParamDecorator((_: never, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<Request>();

  return request.user;
});
