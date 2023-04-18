import { ModuleAsyncOptions } from './type';
import { DynamicModule, InjectionToken, Provider } from '@nestjs/common';

export class ModuleConfiguration<TModuleOptions> {
  constructor(
    private provide: InjectionToken,
    private defaultModuleConfiguration: DynamicModule
  ) {}

  register(options: TModuleOptions): DynamicModule {
    return this.configure([
      {
        provide: this.provide,
        useValue: options
      }
    ]);
  }

  registerAsync(options: ModuleAsyncOptions<TModuleOptions>): DynamicModule {
    return this.configure([
      {
        provide: this.provide,
        useFactory: options.useFactory,
        inject: options.inject || [],
      }
    ]);
  }

  private configure(providers: Provider[]): DynamicModule {
    return {
      ...this.defaultModuleConfiguration,
      providers: [
        ...providers,
        ...this.defaultModuleConfiguration.providers
      ]
    }
  }
}

