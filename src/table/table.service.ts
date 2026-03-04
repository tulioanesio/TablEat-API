import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { UpdateTableDto } from './dto/update-table.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class TableService {
  constructor(private readonly prismaService: PrismaService) {}

  async create() {
    try {
      return await this.prismaService.table.create({
        data: {
          number: 1,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Internal server error while creating table',
      );
    }
  }

  async findOne(id: string) {
    try {
      const table = await this.prismaService.table.findUnique({
        where: { id },
      });

      if (!table) {
        throw new NotFoundException('Table not found');
      }

      return table;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Internal server error while fetching table',
      );
    }
  }

  async update(id: string, updateTableDto: UpdateTableDto) {
    try {
      return await this.prismaService.table.update({
        where: { id },
        data: updateTableDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Table not found');
      }
      throw new InternalServerErrorException(
        'Internal server error while updating table',
      );
    }
  }
}
