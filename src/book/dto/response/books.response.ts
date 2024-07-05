import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { BookResponse } from './book.response';

export class BooksResponse {
  @ApiProperty({ isArray: true, type: () => BookResponse })
  @Expose()
  @Type(() => BookResponse)
  books: BookResponse[];

  @ApiProperty()
  @Expose()
  isLastPage: boolean;

  @ApiProperty()
  @Expose()
  limit: number;

  @ApiProperty()
  @Expose()
  page: number;

  constructor(data: Partial<BooksResponse>) {
    Object.assign(this, data);
  }
}
