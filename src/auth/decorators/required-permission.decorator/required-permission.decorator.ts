import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import type { PERMISSIONS } from './permissions';

export const RequiredPermission = Reflector.createDecorator<keyof typeof PERMISSIONS>();

export const getRequiredPermission = (context: ExecutionContext, reflector: Reflector) =>
  reflector.getAllAndOverride(RequiredPermission, [context.getHandler()]);
