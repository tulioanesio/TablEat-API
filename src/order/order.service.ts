import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  async create(createOrderDto: CreateOrderDto) {
  return await 'This action adds a new order';
  }

  async findAll() {
  return await `This action returns all order`;
  }

  async findOne(id: number) {
  return await `This action returns a #${id} order`;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
  return await `This action updates a #${id} order`;
  }

  async remove(id: number) {
  return await `This action removes a #${id} order`;
  }
}
