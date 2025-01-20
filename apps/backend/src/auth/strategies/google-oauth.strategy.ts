import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { googleOauthConfig } from '../config/google-oauth.config';
import { GoogleUserProfile } from '../types/google';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(
  Strategy,
  googleOauthConfig.KEY,
) {
  constructor(
    @Inject(googleOauthConfig.KEY)
    private readonly config: ConfigType<typeof googleOauthConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: config.clientID,
      clientSecret: config.clientSecret,
      callbackURL: config.callbackURL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _at: string,
    _rt: string,
    profile: GoogleUserProfile,
    done: VerifyCallback,
  ) {
    const user = await this.authService.validateGoogleUser(profile);
    console.log(user);
    done(null, user);
  }
}
