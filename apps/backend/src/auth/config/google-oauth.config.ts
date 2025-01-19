import { registerAs } from '@nestjs/config';
import { StrategyOptions } from 'passport-google-oauth20';

type Config = Pick<
  StrategyOptions,
  'clientID' | 'clientSecret' | 'callbackURL'
>;

export const googleOauthConfig = registerAs(
  'google-oauth',
  (): Config => ({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
  }),
);
