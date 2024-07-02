import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';

export class RegisterRequest {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'Username must be at least 2 characters' })
  @MaxLength(32, { message: 'Username must be less than 32 characters' })
  username: string;
}
