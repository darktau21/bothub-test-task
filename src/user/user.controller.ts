import type { IJwtTokenData } from '@/auth/interfaces';

import { CurrentUserPayload, RequiredPermission } from '@/auth/decorators';
import { Body, Controller, Get, Param, Put, UseFilters } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { UpdateRoleRequest } from './dto/request';
import { UserResponse } from './dto/response';
import { UserExceptionFilter } from './filters';
import { UserService } from './user.service';

const USER_CONTROLLER_ROUTE = '/users';

@UseFilters(UserExceptionFilter)
@Controller(USER_CONTROLLER_ROUTE)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ type: UserResponse })
  @Get('/me')
  async getMe(@CurrentUserPayload() userPayload: IJwtTokenData): Promise<UserResponse> {
    const currentUser = await this.userService.get(userPayload.id);
    return new UserResponse(currentUser);
  }

  @ApiOkResponse({ type: UserResponse })
  @RequiredPermission('CHANGE_USER_ROLE')
  @Put('/:id/role')
  async updateRole(
    @Param('id') id: number,
    @Body() updateRoleDto: UpdateRoleRequest
  ): Promise<UserResponse> {
    const user = await this.userService.update(id, updateRoleDto);
    return new UserResponse(user);
  }
}
