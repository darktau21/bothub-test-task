import type { Prisma, User } from '@prisma/client';

import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({ data: user });
    return createdUser;
  }

  async get(userId: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    return user;
  }

  async update(userId: number, data: Prisma.UserUpdateInput) {
    console.log(userId, data);
    const updatedUser = await this.prisma.user.update({ data, where: { id: userId } });
    return updatedUser;
  }
}
