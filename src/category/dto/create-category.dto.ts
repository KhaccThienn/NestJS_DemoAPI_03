/* eslint-disable prettier/prettier */
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { IsUniqueCate } from 'src/validator/IsUnique.validator';
export default class CreateCategoryDTO {
  @IsNotEmpty()
  @IsString()
  @Expose()
  @IsUniqueCate({
    message: 'This Category Already Exists',
  })
  name: string;

  @IsNotEmpty()
  @Expose()
  status: number;
}
