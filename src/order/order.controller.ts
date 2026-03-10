import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { DraftItemDto } from './dto/draft.item.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('table/:tableId/draft')
  addItemToDraft(
    @Param('tableId') tableId: string,
    @Body() draftItemDto: DraftItemDto,
  ) {
    return this.orderService.addItemToDraft(tableId, draftItemDto);
  }

  @Get('table/:tableId/draft')
  getDraft(@Param('tableId') tableId: string) {
    return this.orderService.getDraft(tableId);
  }

  @Post('table/:tableId/finalize')
  finalizeOrder(@Param('tableId') tableId: string) {
    return this.orderService.finalizeOrder(tableId);
  }

  @Patch('table/:tableId/draft/:productId')
  updateDraftItem(
    @Param('tableId') tableId: string,
    @Param('productId') productId: string,
    @Body('quantity') quantity: number,
  ) {
    return this.orderService.updateDraftItem(tableId, productId, quantity);
  }

  @Delete('table/:tableId/draft/:productId')
  removeDraftItem(
    @Param('tableId') tableId: string,
    @Param('productId') productId: string,
  ) {
    return this.orderService.removeDraftItem(tableId, productId);
  }

  @Get()
    findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
      const pageNumber = page ? Number(page) : 1;
      const limitNumber = limit ? Number(limit) : 10;
      return this.orderService.findAll(pageNumber, limitNumber);
    }
}
