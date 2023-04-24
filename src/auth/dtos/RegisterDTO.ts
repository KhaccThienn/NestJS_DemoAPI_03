/* eslint-disable prettier/prettier */
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class RegisterDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Expose()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Expose()
  password: string;
}
