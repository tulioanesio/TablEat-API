import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(readonly prismaService: PrismaService) {}

  async findAll() {
    try {
      return await this.prismaService.product.findMany({
        orderBy: {
          categoryId: 'asc',
        },
        omit: {
          categoryId: true,
        },
        include: {
          category: true,
        },
      });
    } catch (error) {
      throw new Error('Internal server error while finding products');
    }
  }

  async findOne(id: string) {
    try {
      return await this.prismaService.product.findUnique({
        where: {
          id,
        },
        omit: {
          categoryId: true,
        },
        include: {
          category: true,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Product not found');
      }
      throw new Error('Internal server error while finding product');
    }
  }
}
