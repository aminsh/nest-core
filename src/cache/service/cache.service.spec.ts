import { Test } from '@nestjs/testing';
import { CacheService } from './cache.service';
import { CACHE_SERVICE } from '../cache.constants';
import { CacheModule } from '@nestjs/common';
import { DefaultCacheService } from './default-cache.service';

describe('First test', () => {
  let cacheService: CacheService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        CacheModule.register()
      ],
      providers: [
        {
          provide: CACHE_SERVICE,
          useClass: DefaultCacheService
        } ],
    }).compile();

    cacheService = moduleRef.get<CacheService>(CACHE_SERVICE);
    await cacheService.set('KEY', 'VALUE');
  });

  describe('test find', () => {
    it('should return VALUE', async () => {
      expect(await cacheService.get('KEY')).toBe('VALUE');
    });

    it('should return undefined when key is deleted', async () => {
     await cacheService.del('KEY');
     expect(await cacheService.get('KEY')).toBeUndefined()
    });
  });
});
