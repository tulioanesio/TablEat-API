import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.product.findMany({
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
  }

  findOne(id: number) {
    return this.prismaService.product.findUnique({
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
  }

}
