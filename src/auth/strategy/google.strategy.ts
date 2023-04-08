import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Inject, Injectable } from '@nestjs/common';
import { AUTH_MODULE_OPTIONS, AUTH_USER_GOOGLE_MANAGER_SERVICE } from '../auth.constants';
import { AuthGoogleManagerService, AuthModuleOptions } from '../auth.type';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(@Inject(AUTH_MODULE_OPTIONS)
              private authOptions: AuthModuleOptions,
              @Inject(AUTH_USER_GOOGLE_MANAGER_SERVICE)
              private googleManagerService: AuthGoogleManagerService<any>) {
    super({
      clientID: authOptions.google.clientID,
      clientSecret: authOptions.google.clientSecret,
      callbackURL: authOptions.google.callbackURL,
      scope: authOptions.google.scope
    })
  }

  authenticate(req, options) {
    this.googleManagerService.beforeAuthentication && this.googleManagerService.beforeAuthentication(options);
    super.authenticate(req, options);
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const user = await this.googleManagerService.findOrCreateUser(profile);
    done(null, user);
  }
}
