import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AUTH_MODULE_OPTIONS, AUTH_USER_SERIALIZATION_SERVICE } from '../auth.constants';
import { AuthModuleOptions, AuthUserSerializationService } from '../auth.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(AUTH_MODULE_OPTIONS)
              private authOptions: AuthModuleOptions,
              @Inject(AUTH_USER_SERIALIZATION_SERVICE)
              private userSerializationService: AuthUserSerializationService<any>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authOptions.jwt.secret
    });
  }

  async validate(user: any) {
    return this.userSerializationService.transform(user);
  }
}
