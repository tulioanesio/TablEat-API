import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.prismaService.product.create({
        data: createProductDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
        throw new BadRequestException('Category not found');
      }

      throw new InternalServerErrorException('Internal server error while creating product');
    }
  }

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
      throw new InternalServerErrorException('Internal server error while finding products');
    }
  }

  async findOne(id: string) {
    try {
      return await this.prismaService.product.findUnique({
        where: { id },
        omit: { categoryId: true },
        include: { category: true },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException('Product not found');
      }

      throw new InternalServerErrorException('Internal server error while finding product');
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      return await this.prismaService.product.update({
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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException('Product not found');
      }

      if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
        throw new BadRequestException('Category not found');
      }
      throw new InternalServerErrorException('Internal server error while updating product');
    }
  }

  async remove(id: string) {
    try {
      return await this.prismaService.product.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Product not found');
      }

      throw new InternalServerErrorException(
        'Internal server error while deleting product',
      );
    }
  }
}
