import { ModuleMetadata, Type } from '@nestjs/common';

export interface AuthModuleOptions {
  jwtSecret: string;
  google: {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    scope: string[];
  },
  user: {
    validate: (user: any) => any;
    findOrCreate: (profile: GoogleUserProfile) => Promise<any>;
  }
}

interface GoogleUserProfile {
  name: {
    givenName: string;
    familyName: string;
  },
  emails: string[];
  photos: any;
}

export interface AuthOptionsFactory {
  createAuthOptions(): Promise<AuthModuleOptions> | AuthModuleOptions;
}

export interface JwtModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<AuthOptionsFactory>;
  useClass?: Type<AuthOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<AuthOptionsFactory> | AuthOptionsFactory;
  inject?: any[];
}
