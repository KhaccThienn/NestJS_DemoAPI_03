/* eslint-disable prettier/prettier */
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
export default class UpdateCategoryDTO {
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @IsNotEmpty()
  @Expose()
  status: number;
}
