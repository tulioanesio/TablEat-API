import { IsString, Min, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class DraftItemDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsPositive()
  quantity: number;


}
