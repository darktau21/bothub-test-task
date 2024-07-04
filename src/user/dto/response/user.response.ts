import type { Role, User } from '@prisma/client';

import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserResponse implements Omit<User, 'password'> {
  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  role: Role;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  @ApiProperty()
  @Expose()
  username: string;

  constructor(data: Partial<UserResponse>) {
    Object.assign(this, data);
  }
}
