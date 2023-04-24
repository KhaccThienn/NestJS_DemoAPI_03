/* eslint-disable prettier/prettier */
import { IsNotEmpty, MinLength, IsNumber, Min } from 'class-validator';
export class UpdateProductDTO {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  status: number;

  price: number;

  sale_price: number;

  image: string;
}
