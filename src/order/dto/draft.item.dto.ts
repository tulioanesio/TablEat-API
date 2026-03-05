import { IsString, IsInt, Min, IsNotEmpty, IsNumber } from 'class-validator';

export class DraftItemDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
