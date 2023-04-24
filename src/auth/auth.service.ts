import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity';
import * as argon from 'argon2';
import { Repository } from 'typeorm';
import { LoginDTO, RegisterDTO } from './dtos';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    private readonly jwtService: JwtService,

    private readonly cfgService: ConfigService,
  ) {}

  async register(acc: RegisterDTO): Promise<User> {
    const exts_user = await this.checkUserExists(acc.username);
    if (exts_user) {
      throw new ForbiddenException(`User ${acc.username} already exists`);
    }
    const hashedPass = await argon.hash(acc.password);
    acc.password = hashedPass;

    return await this.userRepo.save(acc);
  }

  async login(acc: LoginDTO) {
    const acc_found = await this.userRepo.findOne({
      where: [{ username: acc.username }],
    });

    if (!acc_found) {
      throw new ForbiddenException('User not found');
    }

    const matchPass = await argon.verify(acc_found.password, acc.password);
    if (!matchPass) {
      throw new ForbiddenException('Passwords does not match');
    }

    delete acc_found.password;
    console.log(acc_found);

    return await this.setToken(acc_found.username);
  }

  async checkUserExists(username: string): Promise<User> {
    const ext_user = await this.userRepo.findOne({
      where: [{ username: username }],
    });
    return ext_user;
  }

  async setToken(username: string): Promise<{
    accessToken: string;
    // refreshToken: string;
  }> {
    const payload = {
      subject: username,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1m',
      secret: this.cfgService.get('SECRET_TOKEN_KEY'),
    });

    // const refreshToken = await this.jwtService.signAsync(payload, {
    //   expiresIn: '10m',
    //   secret: this.cfgService.get('SECRET_REFRESH_TOKEN_KEY'),
    // });

    return {
      accessToken,
      //   refreshToken,
    };
  }
}
