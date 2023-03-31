export interface CacheService {
  set(key: string, value: any, expirationTimeInSeconds?: number): Promise<void>

  get<T>(key: string): Promise<T>;

  del(key: string): Promise<void>;

  keys(pattern?): Promise<string[]>;
}
