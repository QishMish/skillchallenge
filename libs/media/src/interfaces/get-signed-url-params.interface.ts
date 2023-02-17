import { MediaTypesEnum } from "@app/types";

export interface GetSignedUrlParams {
  filename: string;
  contentType: string;
  contentLength?: number;
  mediaType: MediaTypesEnum;
}
