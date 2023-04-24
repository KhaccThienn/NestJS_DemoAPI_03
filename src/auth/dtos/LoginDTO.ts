/* eslint-disable prettier/prettier */
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Expose()
  username: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  password: string;
}
