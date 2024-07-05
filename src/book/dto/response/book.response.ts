import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BookResponse {
  @ApiProperty()
  @Expose()
  author: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  genres: string;

  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  constructor(data: Partial<BookResponse>) {
    Object.assign(this, data);
  }
}
