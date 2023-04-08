import * as redisStore from 'cache-manager-redis-store';
import { CACHE_MODULE_OPTIONS, CacheModuleOptions as NestCacheModuleOptions, Provider, Type } from '@nestjs/common';
import { CacheModuleOptions, CacheProvider, RedisProviderParameters } from './cache.type';
import { CACHE_SERVICE } from './cache.constants';
import { DefaultCacheService } from './service/default-cache.service';
import { CacheService } from './service/cache.service';

export const resolveOptionsProvider = (options: CacheModuleOptions<any>): Provider => (
  {
    provide: CACHE_MODULE_OPTIONS,
    useValue: options
  }
);

export const resolveCashServiceImp = (options: CacheModuleOptions<any>): Provider => {
  if (Object.values(CacheProvider).includes(options.provider as CacheProvider)) {
    return {
      provide: CACHE_SERVICE,
      useClass: DefaultCacheService
    }
  }

  return {
    provide: CACHE_SERVICE,
    useClass: options.provider as Type<CacheService>
  };
}

export const resolveCacheModule = (options: CacheModuleOptions<any>): NestCacheModuleOptions => {
  if (options.provider !== CacheProvider.Redis)
    return {};

  const redisParams: RedisProviderParameters = options.parameters;

  return {
    store: redisStore,
    host: redisParams.host,
    port: redisParams.port
  }
}
