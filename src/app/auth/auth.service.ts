import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signInDto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

 /*  async signIn(singIn: SignInDto) {
    const user = await this.usersService.findOne(singIn.email);
    if (user?.email !== singIn.email) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.orgname, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  } */
}
