import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@/book/const';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetAllBooksParam {
  @ApiProperty({ default: DEFAULT_LIMIT })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit: number;

  @ApiProperty({ default: DEFAULT_PAGE })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page: number;
}
