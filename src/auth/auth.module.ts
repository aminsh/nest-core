import { DynamicModule, Module, Provider } from '@nestjs/common';
import { createAuthProvider } from './auth.providers';
import { AuthModuleOptions, AuthOptionsFactory } from './auth.type';
import { AuthModuleAsyncOptions } from '@nestjs/passport';
import { AUTH_MODULE_OPTIONS, AUTH_USER_SERIALIZATION_SERVICE, JWT_TOKEN_GENERATOR_SERVICE } from './auth.constants';
import { JwtTokenGeneratorServiceImp } from './service/jwt-token-generator.service.imp';
import { JwtModule } from '@nestjs/jwt';
import { JwtHttpAuthenticationGuard } from './guard';
import { JwtStrategy } from './strategy';

@Module({
  providers: [
    JwtHttpAuthenticationGuard,
    //JwtGqlAuthenticationGuard,
    //GoogleStrategy,
    JwtStrategy,
    {
      provide: JWT_TOKEN_GENERATOR_SERVICE,
      useClass: JwtTokenGeneratorServiceImp
    }
  ]
})
export class AuthModule {
  static register(options: AuthModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      providers: [
        ...createAuthProvider(options),
        {
          provide: AUTH_USER_SERIALIZATION_SERVICE,
          useClass: options.userSerializationService
        }
      ],
      imports: [
        JwtModule.register({
          secret: options.jwt.secret,
          signOptions: { expiresIn: options.jwt.expiresIn }
        })
      ]
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
