import type { Prisma } from '@prisma/client';

import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

import type { UpdateBookRequest } from './dto/request';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.BookCreateInput) {
    return this.prisma.book.create({ data });
  }

  delete(id: number) {
    return this.prisma.book.delete({ where: { id } });
  }

  async findAll(page: number, limit: number) {
    const total = await this.prisma.book.count();
    const books = await this.prisma.book.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    return [books, total] as const;
  }

  findOne(id: number) {
    return this.prisma.book.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, data: Prisma.BookUpdateInput) {
    return this.prisma.book.update({ data, where: { id } });
  }
}
