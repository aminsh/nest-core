import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Inject, Injectable } from '@nestjs/common';
import { AUTH_MODULE_OPTIONS } from '../auth.constants';
import { AuthModuleOptions } from '../auth.type';
import base64url from 'base64url';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(@Inject(AUTH_MODULE_OPTIONS) private authOptions: AuthModuleOptions) {
    super({
      clientID: authOptions.google.clientID,
      clientSecret: authOptions.google.clientSecret,
      callbackURL: authOptions.google.callbackURL,
      scope: authOptions.google.scope
    })
  }

  authenticate(req, options) {
    const callbackURL = req.query['callbackUrl'];
    if (callbackURL)
      options.state = base64url.encode(callbackURL.toString());

    super.authenticate(req, options)
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const user = this.authOptions.user.findOrCreate(profile);
    done(null, user);
  }
}
