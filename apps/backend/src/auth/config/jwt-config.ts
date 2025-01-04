import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig = registerAs(
  'jwt',
  (): JwtModuleOptions => ({
    secret: process.env.ACCESS_TOKEN_SECRET,
    signOptions: {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    },
  }),
);
