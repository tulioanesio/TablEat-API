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
export class TableService implements OnModuleInit {
  constructor(private readonly prismaService: PrismaService) {}

  async onModuleInit() {
    await this.ensureFixedTableExists();
  }

  private async ensureFixedTableExists() {
    const fixedId = '01955e9c-8a20-72d5-9988-123456789abc';

    await this.prismaService.table.upsert({
      where: { id: fixedId },
      update: {},
      create: {
        id: fixedId,
        number: 1,
      },
    });
  }

  async findAll() {
    try {
      return await this.prismaService.table.findMany();
    } catch (error) {
      throw new InternalServerErrorException(
        'Internal server error while fetching tables',
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
