import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dtos';
import { plainToClass } from 'class-transformer';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() acc: RegisterDTO) {
    const validateData = plainToClass(RegisterDTO, acc, {
      excludeExtraneousValues: true,
    });

    return await this.authService.register(validateData);
  }

  @Post('login')
  async login(@Body() acc: LoginDTO) {
    const validateData = plainToClass(LoginDTO, acc, {
      excludeExtraneousValues: true,
    });

    return await this.authService.login(validateData);
  }
}
