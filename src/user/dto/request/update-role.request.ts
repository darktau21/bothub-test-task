import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum } from 'class-validator';

export class UpdateRoleRequest {
  @ApiProperty()
  @IsEnum(Role, {
    message: 'Invalid role',
  })
  role: Role;
}
