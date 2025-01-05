import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

export const LOCAL_STRATEGY_KEY = 'local';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  LOCAL_STRATEGY_KEY,
) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'login',
    });
  }

  validate(login: string, password: string) {
    return this.authService.validateLocalUser(login, password);
  }
}
