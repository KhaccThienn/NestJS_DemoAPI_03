/* eslint-disable prettier/prettier */
import { IsNotEmpty, MinLength, IsNumber, Min } from 'class-validator';
export class UpdateProductDTO {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNumber()
  status: number;

  @IsNumber()
  @Min(1)
  price: number;

  @Min(0)
  sale_price: number;

  image: string;
}
