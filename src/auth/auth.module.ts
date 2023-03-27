import { DynamicModule, Module, Provider } from '@nestjs/common';
import { JwtGqlAuthenticationGuard } from './guard/jwt-gql-authentication.guard';
import { JwtHttpAuthenticationGuard } from './guard/jwt-http-authentication.guard';
import { createAuthProvider } from './auth.providers';
import { AuthModuleOptions, AuthOptionsFactory } from './auth.type';
import { AuthModuleAsyncOptions } from '@nestjs/passport';
import { AUTH_MODULE_OPTIONS } from './auth.constants';
import { GoogleStrategy } from './strategy/google.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  providers: [
    JwtHttpAuthenticationGuard,
    JwtGqlAuthenticationGuard,
    GoogleStrategy,
    JwtStrategy
  ]
})
export class AuthModule {
  static register(options: AuthModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      providers: createAuthProvider(options)
    };
  }

  static registerAsync(options: AuthModuleAsyncOptions): DynamicModule {
    return {
      module: AuthModule,
      imports: options.imports || [],
      providers: this.createAsyncProviders(options)
    };
  }

  private static createAsyncProviders(
    options: AuthModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [ this.createAsyncOptionsProvider(options) ];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass
      }
    ];
  }

  private static createAsyncOptionsProvider(
    options: AuthModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: AUTH_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }
    return {
      provide: AUTH_MODULE_OPTIONS,
      useFactory: async (optionsFactory: AuthOptionsFactory) =>
        await optionsFactory.createAuthOptions(),
      inject: [ options.useExisting || options.useClass ]
    };
  }
}
