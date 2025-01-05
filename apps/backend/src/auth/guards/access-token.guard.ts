import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { accessTokenJwtConfig } from '../config/access-token.config';

@Injectable()
export class AccessTokenGuard extends AuthGuard(accessTokenJwtConfig.KEY) {}
