import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { accessTokenJwtConfig } from './config/access-token.config';
import { refreshTokenJwtConfig } from './config/refresh-token.config';
import {
  AccessTokenPayload,
  RefreshTokenPayload,
} from './types/token-payloads';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(accessTokenJwtConfig.KEY)
    private readonly accessTokenConfiguration: ConfigType<
      typeof accessTokenJwtConfig
    >,
    @Inject(refreshTokenJwtConfig.KEY)
    private readonly refreshTokenConfiguration: ConfigType<
      typeof refreshTokenJwtConfig
    >,
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
    const { access: accessToken, refresh: refreshToken } =
      await this.generateTokens(userId);

    return { userId, login, accessToken, refreshToken };
  }

  async refreshTokens(userId: string, login: string) {
    const { access: accessToken, refresh: refreshToken } =
      await this.generateTokens(userId);

    return { userId, login, accessToken, refreshToken };
  }

  private async generateTokens(userId: string) {
    const accessTokenPayload: AccessTokenPayload = {
      sub: userId,
    };

    // TODO: add session info
    const refreshTokenPayload: AccessTokenPayload = {
      sub: userId,
    };

    const [access, refresh] = await Promise.all([
      this.jwtService.signAsync(
        accessTokenPayload,
        this.accessTokenConfiguration,
      ),
      this.jwtService.signAsync(
        refreshTokenPayload,
        this.refreshTokenConfiguration,
      ),
    ]);

    return { access, refresh };
  }

  async validateAccessToken(payload: AccessTokenPayload) {
    const neededUser = await this.usersService.findOne({ id: payload.sub });

    if (!neededUser) throw new UnauthorizedException();

    return { id: neededUser.id, login: neededUser.login };
  }

  async validateRefreshToken(payload: RefreshTokenPayload) {
    const neededUser = await this.usersService.findOne({ id: payload.sub });

    if (!neededUser) throw new UnauthorizedException();

    return { id: neededUser.id, login: neededUser.login };
  }
}
