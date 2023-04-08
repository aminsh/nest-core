import { JwtService } from '@nestjs/jwt';
import { AuthModuleOptions, JWTAccessToken, JwtTokenGeneratorService } from '../auth.type';
import { Inject, Injectable } from '@nestjs/common';
import { AUTH_MODULE_OPTIONS } from '../auth.constants';

@Injectable()
export class JwtTokenGeneratorServiceImp implements JwtTokenGeneratorService {
  constructor(private jwtService: JwtService,
              @Inject(AUTH_MODULE_OPTIONS) private options: AuthModuleOptions) {}

  async generate(user: any): Promise<JWTAccessToken> {
    return {
      access_token: await this.jwtService.signAsync(user),
      token_type: 'Bearer',
      expires_in: this.options.jwt.expiresIn.toString()
    }
  }
}
