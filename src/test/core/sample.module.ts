import { DynamicModule, Inject, Injectable, Module } from '@nestjs/common';
import { ModuleAsyncOptions, ModuleConfiguration } from '../../utils/module-register.utils';

const SAMPLE_MODULE_OPTIONS = 'SAMPLE_MODULE_OPTIONS'

@Module({})
export class SampleModule {
  static register(options: SampleModuleOptions): DynamicModule {
    return moduleRegistration.register(options)
  }

  static registerAsync(options: ModuleAsyncOptions<SampleModuleOptions>): DynamicModule {
    return moduleRegistration.registerAsync(options);
  }
}

@Injectable()
export class SampleService {
  constructor(@Inject(SAMPLE_MODULE_OPTIONS) public options: SampleModuleOptions) {}
}

const moduleRegistration = new ModuleConfiguration<SampleModuleOptions>(
  SAMPLE_MODULE_OPTIONS,
  {
    module: SampleModule,
    providers: [
      SampleService
    ]
  }
)

export interface SampleModuleOptions {
  name: string;
  secret: string;
  global?: boolean;
}
