/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/user/entity';
import { Repository } from 'typeorm';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'authh') {
  constructor(
    configService: ConfigService,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SECRET_TOKEN_KEY'),
    });
  }

  async validate(payload: { subject: string }) {
    const user_found = await this.userRepo.findOne({
      where: [{ username: payload.subject }],
    });

    delete user_found.password;
    return user_found;
  }
}
