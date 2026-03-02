import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.prismaService.category.create({
        data: createCategoryDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new BadRequestException('Category not found');
      }

      throw new InternalServerErrorException('Failed to create category');
    }
  }

  async findAll() {
    try {
      return await this.prismaService.category.findMany();
    } catch (error) {
      throw new InternalServerErrorException(
        'Internal server error while finding all categories',
      );
    }
  }

  async findOne(id: string) {
    try {
      return await this.prismaService.category.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Category not found');
      }

      throw new InternalServerErrorException(
        'Internal server error while finding category',
      );
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.prismaService.category.update({
        where: {
          id,
        },
        data: updateCategoryDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update category');
    }
  }
  async remove(id: string) {
    try {
      return await this.prismaService.category.delete({
        where: {
          id,
        },
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
