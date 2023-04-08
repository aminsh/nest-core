import { CacheModule as NestCacheModule, DynamicModule, Module } from '@nestjs/common';
import { CacheModuleOptions } from './cache.type';
import { CACHE_SERVICE } from './cache.constants';
import { resolveCacheModule, resolveCashServiceImp, resolveOptionsProvider } from './cache.providers';

@Module({
  imports: [],
  exports: [
    CACHE_SERVICE
  ]
})
export class CacheModule {
  static register<TParameters>(options: CacheModuleOptions<TParameters>): DynamicModule {
    return {
      module: CacheModule,
      providers: [
        resolveOptionsProvider(options),
        resolveCashServiceImp(options)
      ]
        .filter(e => e),
      imports: [
        NestCacheModule.register(resolveCacheModule(options))
      ]
    }
  }
}
