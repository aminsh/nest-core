import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AUTH_MODULE_OPTIONS } from '../auth.constants';
import { AuthModuleOptions } from '../auth.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(AUTH_MODULE_OPTIONS)
              private authOptions: AuthModuleOptions) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authOptions.jwtSecret
    });
  }

  async validate(user: any) {
    return this.authOptions.user.validate(user);
  }
}
