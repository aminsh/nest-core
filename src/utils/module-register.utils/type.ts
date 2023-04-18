import { ModuleMetadata } from '@nestjs/common';

export interface ModuleAsyncOptions<TModuleOptions> extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<TModuleOptions> | TModuleOptions;
  inject?: any[];
}
