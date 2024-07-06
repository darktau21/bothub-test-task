import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { getRequiredPermission } from '../decorators/required-permission.decorator';
import {
  PERMISSIONS,
  ROLES_PERMISSIONS,
} from '../decorators/required-permission.decorator/permissions';

@Injectable()
export class RequiredPermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredPermission = getRequiredPermission(context, this.reflector);
    if (!requiredPermission) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const userPermissions = ROLES_PERMISSIONS[user?.role];
    const requiredPermissionValue = PERMISSIONS[requiredPermission];

    return (userPermissions & requiredPermissionValue) === requiredPermissionValue;
  }
}
