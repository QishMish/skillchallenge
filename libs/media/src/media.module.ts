import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MEDIA_SERVICE, PRESIGNED_URL_PROVIDER } from "./constants";
import { MediaEntity } from "./entities";
import { MediaRepository } from "./media.repository";
import { MediaService } from "./media.service";
import { S3ProviderService } from "./s3-provider.service";

@Module({
  imports: [TypeOrmModule.forFeature([MediaEntity])],
  providers: [
    MediaRepository,
    {
      provide: PRESIGNED_URL_PROVIDER,
      useClass: S3ProviderService,
    },
    {
      provide: MEDIA_SERVICE,
      useClass: MediaService,
    },
  ],
  exports: [MEDIA_SERVICE, MediaRepository],
})
export class MediaLibModule {}
