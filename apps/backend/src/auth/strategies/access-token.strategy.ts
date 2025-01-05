import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { accessTokenConfig } from '../config/access-token.config';
import { AccessTokenPayload } from '../types/access-token-payload.types';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(accessTokenConfig.KEY)
    private readonly accessTokenConfiguration: ConfigType<
      typeof accessTokenConfig
    >,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: accessTokenConfiguration.secret,
      ignoreExpiration: false,
    });
  }

  validate(payload: AccessTokenPayload) {
    console.log(payload);
    return this.authService.validateAccessToken(payload);
  }
}
