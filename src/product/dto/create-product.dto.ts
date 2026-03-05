import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsInt,
  IsPositive,
  Min,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Name must be a valid string.' })
  @IsNotEmpty({ message: 'Name should not be empty.' })
  name: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price must be a number with up to 2 decimal places.' },
  )
  @IsPositive({ message: 'Price must be a positive value.' })
  @IsNotEmpty({ message: 'Price is required.' })
  price: number;

  @IsString({ message: 'Description must be a valid string.' })
  @IsNotEmpty({ message: 'Description should not be empty.' })
  description?: string;

  @IsString({ message: 'Ingredients must be a valid string.' })
  @IsNotEmpty({ message: 'Ingredients should not be empty.' })
  ingredients?: string;

  @IsString({ message: 'Image URL must be a valid string.' })
  @IsUrl({}, { message: 'Image URL must be a valid URL.' })
  imageUrl?: string;

  @IsNotEmpty({ message: 'Category ID is required.' })
  @IsString({ message: 'Category ID must be a valid string.' })
  categoryId: string;
}
