import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateOrderDto {
    @IsNumber()
    @IsPositive()
    quantity: number;
}
