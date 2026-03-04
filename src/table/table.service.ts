import { Injectable, OnModuleInit } from '@nestjs/common';
import { UpdateTableDto } from './dto/update-table.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TableService implements OnModuleInit {
  constructor(private readonly prismaService: PrismaService) {}

  async onModuleInit() {
    await this.ensureFixedTableExists();
  }

  private async ensureFixedTableExists() {
    const fixedId = "01955e9c-8a20-72d5-9988-123456789abc";

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
    return await this.prismaService.table.findMany();
  }

  async update(id: string, updateTableDto: UpdateTableDto) {
    return await this.prismaService.table.update({
      where: { id },
      data: updateTableDto,
    });
  }
}
