import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { accessTokenJwtConfig } from './config/access-token.config';
import { googleOauthConfig } from './config/google-oauth.config';
import { refreshTokenJwtConfig } from './config/refresh-token.config';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { GoogleOauthStrategy } from './strategies/google-oauth.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [
    JwtModule,
    ConfigModule.forFeature(accessTokenJwtConfig),
    ConfigModule.forFeature(refreshTokenJwtConfig),
    ConfigModule.forFeature(googleOauthConfig),
    DrizzleModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    GoogleOauthStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
