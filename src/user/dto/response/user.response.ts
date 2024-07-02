import { IsEmail, IsInt, IsString, MaxLength, MinLength } from 'class-validator';

export class UserResponse {
  @IsEmail()
  email: string;

  @IsInt()
  id: number;

  @IsString()
  @MinLength(2, { message: 'Username must be at least 2 characters' })
  @MaxLength(32, { message: 'Username must be less than 32 characters' })
  username: string;
}
