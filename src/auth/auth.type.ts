import { ModuleMetadata, Type } from '@nestjs/common';

export interface AuthModuleOptions {
  jwt: {
    secret: string;
    expiresIn: string;
  },
  userSerializationService: Type<AuthUserSerializationService<any>>,
  google?: {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    scope: string[];
    authManagerService: Type<AuthGoogleManagerService<any>>
  }
}

export interface GoogleUserProfile {
  name: {
    givenName: string;
    familyName: string;
  },
  emails: string[];
  photos: any;
}

export interface AuthUserSerializationService<TUser> {
  transform(user: TUser);
}

export interface AuthGoogleManagerService<TUser> {
  findOrCreateUser: (profile: GoogleUserProfile) => Promise<TUser>;
  beforeAuthentication?: (options: any) => void;
}

export interface AuthOptionsFactory {
  createAuthOptions(): Promise<AuthModuleOptions> | AuthModuleOptions;
}

export interface AuthModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<AuthOptionsFactory>;
  useClass?: Type<AuthOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<AuthOptionsFactory> | AuthOptionsFactory;
  inject?: any[];
}

export interface JWTAccessToken {
  access_token: string;
  token_type: string;
  expires_in: string;
}

export interface JwtTokenGeneratorService {
  generate(user: any): Promise<JWTAccessToken>;
}
