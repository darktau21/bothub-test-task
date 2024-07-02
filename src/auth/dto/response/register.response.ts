import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class RegisterResponse {
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
  @Exclude()
  password: string;

  @ApiProperty()
  @Expose()
  role: Role;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  @ApiProperty()
  @Expose()
  username: string;

  constructor(user: Partial<RegisterResponse>) {
    Object.assign(this, user);
  }
}
