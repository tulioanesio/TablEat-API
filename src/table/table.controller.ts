import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TableService } from './table.service';
import { UpdateTableDto } from './dto/update-table.dto';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  findAll() {
    return this.tableService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tableService.update(id, updateTableDto);
  }
}
