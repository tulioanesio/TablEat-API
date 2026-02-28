import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prismaService.product.create({
      data: createProductDto,
    });
  }

  findAll() {
    return this.prismaService.product.findMany({
      orderBy: {
        categoryId: 'desc',
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

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prismaService.product.update({
      where: {
        id,
      },
      data: updateProductDto,
      include: {
        category: true,
      },
      omit: {
        categoryId: true,
      },
    });
  }

  remove(id: number) {
    return this.prismaService.product.delete({
      where: {
        id,
      },
    });
  }
}
