import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString, MinLength } from 'class-validator';

export class CreateBookRequest {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  author: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  genres: string;

  @ApiProperty()
  @IsDateString()
  publicationDate: Date;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  title: string;
}
