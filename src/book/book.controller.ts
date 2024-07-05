import { PublicRoute, RequiredPermission } from '@/auth/decorators';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';

import { BookService } from './book.service';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from './const';
import { CreateBookRequest, GetAllBooksParam, UpdateBookRequest } from './dto/request';
import { BookResponse, BooksResponse } from './dto/response';
import { BookExceptionFilter } from './filters';

const BOOK_CONTROLLER_ROUTE = '/books';

@UseFilters(BookExceptionFilter)
@Controller(BOOK_CONTROLLER_ROUTE)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOkResponse({ type: BookResponse })
  @RequiredPermission('ADD_BOOK')
  @Post()
  async create(@Body() data: CreateBookRequest): Promise<BookResponse> {
    const book = await this.bookService.create(data);
    return new BookResponse(book);
  }

  @ApiNoContentResponse({ description: 'Book deleted successfully' })
  @RequiredPermission('DELETE_BOOK')
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number): Promise<void> {
    await this.bookService.delete(id);
  }

  @ApiOkResponse({ type: BooksResponse })
  @PublicRoute()
  @Get()
  async findAll(@Query() query: GetAllBooksParam): Promise<BooksResponse> {
    const page = query.page ?? DEFAULT_PAGE;
    const limit = query.limit ?? DEFAULT_LIMIT;
    const [books, total] = await this.bookService.findAll(page, limit);
    return new BooksResponse({
      books,
      isLastPage: total <= page * limit,
      limit,
      page,
    });
  }

  @ApiOkResponse({ type: BookResponse })
  @PublicRoute()
  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<BookResponse> {
    const book = await this.bookService.findOne(id);
    return new BookResponse(book);
  }

  @ApiOkResponse({ type: BookResponse })
  @RequiredPermission('UPDATE_BOOK')
  @Put('/:id')
  async update(@Param('id') id: number, @Body() data: UpdateBookRequest): Promise<BookResponse> {
    const book = await this.bookService.update(id, data);
    return new BookResponse(book);
  }
}
