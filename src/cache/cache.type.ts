import { Type } from '@nestjs/common';
import { CacheService } from './service/cache.service';

export interface CacheModuleOptions<TProviderParameters> {
  provider: CacheProvider | Type<CacheService>;
  parameters?: TProviderParameters
}

export enum CacheProvider {
  InMemory = 'InMemory',
  Redis = 'Redis'
}

export interface RedisProviderParameters {
  host: string;
  port: number;
}
