import type { User } from '@prisma/client';

import { CurrentUserPayload } from '@/auth/decorators';
import { Controller, Get } from '@nestjs/common';

import { UserResponse } from './dto/response';
import { UserService } from './user.service';

const USER_CONTROLLER_ROUTE = '/users';

@Controller(USER_CONTROLLER_ROUTE)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async getMe(@CurrentUserPayload() userPayload: User) {
    const currentUser = await this.userService.get(userPayload.id);
    return new UserResponse(currentUser);
  }
}
