import { Controller, Get } from '@nestjs/common';

import { UserService } from './user.service';

const USER_CONTROLLER_ROUTE = '/users';

@Controller(USER_CONTROLLER_ROUTE)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Put()
  // createUser(@Body() body: CreateUserSchema) {
  //   return this.userService.createUser(body);
  // }

  @Get('/me')
  getMe() {
    return 'Hello World';
  }
}
