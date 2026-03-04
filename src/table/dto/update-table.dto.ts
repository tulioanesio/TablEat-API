import { IsNumber, IsPositive } from 'class-validator';

export class UpdateTableDto {
  @IsNumber()
  @IsPositive()
  number: number;
}