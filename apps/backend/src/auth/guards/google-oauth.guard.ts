import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { googleOauthConfig } from '../config/google-oauth.config';

@Injectable()
export class GoogleOauthGuard extends AuthGuard(googleOauthConfig.KEY) {}
