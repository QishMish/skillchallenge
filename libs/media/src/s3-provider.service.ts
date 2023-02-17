import {
  PresignedUrl,
  PresignedUrlPost,
  PresignedUrlProvider,
} from "./interfaces";
import { GetSignedUrlParams } from "./interfaces";
import { Injectable, HttpException } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class S3ProviderService implements PresignedUrlProvider {
  constructor(private readonly configService: ConfigService) {}

  async createPresignedPost(
    signedUrlParams: GetSignedUrlParams
  ): Promise<PresignedUrlPost> {
    const { filename, contentType, mediaType } = signedUrlParams;

    return {
      url: "url",
      fields: {
        key: "key",
      },
    };
  }

  async createPresigned(
    signedUrlParams: GetSignedUrlParams
  ): Promise<PresignedUrl> {
    const { filename, contentType, mediaType } = signedUrlParams;
    return {
      url: "url",
    };
  }
}
