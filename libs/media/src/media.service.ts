import { BaseMedia, Media } from "@app/types";
import { Inject, Injectable } from "@nestjs/common";
import { FindManyOptions, FindOneOptions } from "typeorm";
import { PRESIGNED_URL_PROVIDER } from "./constants";
import {
  GetSignedUrlParams,
  MediaServiceInterface,
  PresignedUrl,
  PresignedUrlPost,
  PresignedUrlProvider,
} from "./interfaces";
import { MediaRepository } from "./media.repository";

@Injectable()
export class MediaService
  implements MediaServiceInterface, PresignedUrlProvider
{
  constructor(
    private readonly mediaRepository: MediaRepository,
    @Inject(PRESIGNED_URL_PROVIDER)
    private readonly presignedUrlProviderService: PresignedUrlProvider
  ) {}
  public createPresignedPost(
    signedUrlParams: GetSignedUrlParams
  ): PresignedUrlPost | Promise<PresignedUrlPost> {
    return this.presignedUrlProviderService.createPresignedPost(
      signedUrlParams
    );
  }
  public createPresigned(
    signedUrlParams: GetSignedUrlParams
  ): PresignedUrl | Promise<PresignedUrl> {
    return this.presignedUrlProviderService.createPresigned(signedUrlParams);
  }

  public create(entity: unknown): Promise<BaseMedia> {
    return this.mediaRepository.create(entity);
  }
  public find(filterOptions?: FindManyOptions<Media>): Promise<BaseMedia[]> {
    return this.mediaRepository.find(filterOptions);
  }
  public findOne(option: FindOneOptions<Media>): Promise<BaseMedia> {
    return this.mediaRepository.findOne(option);
  }
  public delete(option: FindOneOptions<Media>): Promise<boolean | BaseMedia> {
    return this.mediaRepository.delete(option);
  }
}
