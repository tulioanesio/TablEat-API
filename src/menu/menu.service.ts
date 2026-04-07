import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../generated/prisma/client';

@Injectable()
export class MenuService {
  constructor(readonly prismaService: PrismaService) {}

  async findAll(page: number = 1, limit: number = 10) {
      try {
        const take = Number(limit);
        const skip = (Number(page) - 1) * take;
  
        const [products, totalItems] = await Promise.all([
          this.prismaService.product.findMany({
            skip, 
            take,
            orderBy: {
              categoryId: 'asc',
            },
            omit: {
              categoryId: true,
            },
            include: {
              category: true,
            },
          }),
          this.prismaService.product.count(),
        ]);
  
        const totalPages = Math.ceil(totalItems / take);
  
        return {
          data: products,
          meta: {
            totalItems,
            totalPages,
            currentPage: Number(page),
            itemsPerPage: take,
            hasNextPage: Number(page) < totalPages,
            hasPreviousPage: Number(page) > 1,
          },
        };
      } catch (error) {
        throw new InternalServerErrorException(
          'Internal server error while finding products',
        );
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
