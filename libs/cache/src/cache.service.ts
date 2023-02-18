import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async get(prefix: string, key: string): Promise<any> {
    const cacheKey = this.getCacheKey(prefix, key);
    return this.cacheManager.get(cacheKey);
  }

  async set(
    prefix: string,
    key: string,
    value: any,
    ttl: number = 60
  ): Promise<void> {
    const cacheKey = this.getCacheKey(prefix, key);
    return this.cacheManager.set(cacheKey, value, ttl);
  }

  async del(prefix: string, key: string): Promise<void> {
    const cacheKey = this.getCacheKey(prefix, key);
    return this.cacheManager.del(cacheKey);
  }

  async reset(): Promise<void> {
    return this.cacheManager.reset();
  }

  private getCacheKey(prefix: string, key: string): string {
    return `${prefix}:${key}`;
  }
}
