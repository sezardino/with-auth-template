import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import {
  GOOGLE_OAUTH_ACCESS_TOKEN_PARAM,
  GOOGLE_OAUTH_REFRESH_TOKEN_PARAM,
} from './const/search-params';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshTokenAuthGuard } from './guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Post('registration')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user.userId, req.user.login);
  }

  @UseGuards(RefreshTokenAuthGuard)
  @Post('refresh')
  refresh(@Request() req) {
    return this.authService.refreshTokens(req.user.id, req.user.login);
  }

  @UseGuards(GoogleOauthGuard)
  @Get('google/login')
  googleLogin() {}

  @UseGuards(GoogleOauthGuard)
  @Get('google/callback')
  async googleCallback(@Request() req, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(
      req.user.id,
      req.user.login,
    );

    const redirectUrl = new URL(
      `${this.configService.get<string>('FRONTEND_URL')}/auth`,
    );

    redirectUrl.searchParams.set(
      GOOGLE_OAUTH_REFRESH_TOKEN_PARAM,
      refreshToken,
    );
    redirectUrl.searchParams.set(GOOGLE_OAUTH_ACCESS_TOKEN_PARAM, accessToken);

    res.redirect(redirectUrl.toString());
  }
}
