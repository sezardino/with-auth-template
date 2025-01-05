import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { refreshTokenJwtConfig } from '../config/refresh-token.config';
import { RefreshTokenPayload } from '../types/token-payloads';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  refreshTokenJwtConfig.KEY,
) {
  constructor(
    @Inject(refreshTokenJwtConfig.KEY)
    private readonly config: ConfigType<typeof refreshTokenJwtConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('token'),
      secretOrKey: config.secret,
      ignoreExpiration: false,
    });
  }

  validate(payload: RefreshTokenPayload) {
    return this.authService.validateRefreshToken(payload);
  }
}
