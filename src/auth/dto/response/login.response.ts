import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoginResponse {
  @ApiProperty()
  @Expose()
  token: string;

  constructor(data: Partial<LoginResponse>) {
    Object.assign(this, data);
  }
}
