import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AccessTokenPayload } from './types/access-token-payload.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    const user = await this.usersService.findOne({ login: dto.login });

    if (user) throw new ForbiddenException('Login already used');

    await this.usersService.createUser(dto);
  }

  async validateLocalUser(login: string, password: string) {
    const user = await this.usersService.findOne({ login });

    if (!user) throw new ForbiddenException('Wrong credentials');

    const isPasswordMatch = await verify(user.password, password);

    if (!isPasswordMatch) throw new ForbiddenException('Wrong credentials');

    return { userId: user.id, login: user.login };
  }

  async login(userId: string, login: string) {
    const { accessToken } = await this.generateTokens(userId);

    return { userId, login, accessToken };
  }

  private async generateTokens(userId: string) {
    const accessTokenPayload: AccessTokenPayload = {
      sub: userId,
    };

    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(accessTokenPayload),
    ]);

    return { accessToken };
  }

  async validateAccessToken(payload: AccessTokenPayload) {
    console.log(payload);
    const neededUser = await this.usersService.findOne({ id: payload.sub });

    if (!neededUser) throw new UnauthorizedException();

    return { id: neededUser.id, login: neededUser.login };
  }
}
