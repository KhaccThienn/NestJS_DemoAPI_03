import { Controller, UseGuards, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('authh'))
  @Get('/detail')
  detail(@Req() req: Request) {
    console.log(req.user);
    return req.user[0];
  }
}
