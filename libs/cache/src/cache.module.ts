import { DynamicModule, Module, CacheModule } from "@nestjs/common";
import { CacheService } from "./cache.service";
import { CacheModuleOptions } from "./interfaces";
import * as redisStore from "cache-manager-ioredis";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheConfigModule {
  static register({ prefix }: CacheModuleOptions): DynamicModule {
    return {
      module: CacheConfigModule,
      imports: [
        CacheModule.registerAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => {
            return {
              store: redisStore,
              host: configService.get("REDIS_HOST"),
              port: configService.get("REDIS_PORT"),
              keyPrefix: prefix,
            }
          },
          inject: [ConfigService],
        }),
      ],
      providers: [CacheService],
      exports: [CacheService],
    };
  }
}
