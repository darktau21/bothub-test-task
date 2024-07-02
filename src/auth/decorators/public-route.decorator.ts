import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const PublicRoute = Reflector.createDecorator({ transform: () => true });

export const isPublic = (context: ExecutionContext, reflector: Reflector) =>
  reflector.getAllAndOverride<boolean>(PublicRoute, [context.getHandler(), context.getClass()]);
