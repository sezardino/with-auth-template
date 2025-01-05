import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { refreshTokenJwtConfig } from '../config/refresh-token.config';

@Injectable()
export class RefreshTokenAuthGuard extends AuthGuard(
  refreshTokenJwtConfig.KEY,
) {}
