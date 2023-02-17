import { GetSignedUrlParams } from "./get-signed-url-params.interface";
import { PresignedUrl, PresignedUrlPost } from "./signed-url.interface";

export interface PresignedUrlProvider {
  createPresignedPost(
    signedUrlParams: GetSignedUrlParams
  ): Promise<PresignedUrlPost> | PresignedUrlPost;

  createPresigned(
    signedUrlParams: GetSignedUrlParams
  ): Promise<PresignedUrl> | PresignedUrl;
}
