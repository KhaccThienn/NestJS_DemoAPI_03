/* eslint-disable prettier/prettier */
import { IsNotEmpty, MinLength, IsNumber, Min, Validate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDTO {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNumber()
  @Type(() => Number)
  status: number;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  price: number;

  @Min(0)
  @Type(() => Number)
  sale_price: number;

  
  image: string;
}
