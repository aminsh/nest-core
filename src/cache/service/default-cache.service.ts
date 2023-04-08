import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CacheService } from './cache.service';

@Injectable()
export class DefaultCacheService implements CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  set(key: string, value: any, expirationTimeInSeconds: number = 0): Promise<void> {
    return this.cacheManager.set(key, value, { ttl: expirationTimeInSeconds }) as Promise<void>;
  }

  get<T>(key: string): Promise<T> {
    return this.cacheManager.get(key) as Promise<T>;
  }

  del(key: string): Promise<void> {
    return this.cacheManager.del(key) as Promise<void>;
  }

  keys(pattern: string = '*'): Promise<string[]> {
    return this.cacheManager.store.keys(pattern);
  }
}
