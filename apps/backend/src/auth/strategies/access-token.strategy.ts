import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { accessTokenJwtConfig } from '../config/access-token.config';
import { AccessTokenPayload } from '../types/token-payloads';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  accessTokenJwtConfig.KEY,
) {
  constructor(
    @Inject(accessTokenJwtConfig.KEY)
    private readonly config: ConfigType<typeof accessTokenJwtConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.secret,
      ignoreExpiration: false,
    });
  }

  validate(payload: AccessTokenPayload) {
    return this.authService.validateAccessToken(payload);
  }
}
