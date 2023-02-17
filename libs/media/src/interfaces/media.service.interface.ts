import { ServiceInterface, BaseOption, Media, BaseMedia } from "@app/types";
import { PresignedUrlProvider } from "./presigned-url-provider.interface";

interface MediaServiceInterface
  extends PresignedUrlProvider,
    Omit<ServiceInterface<Media, BaseMedia>, "update"> {}

export { MediaServiceInterface };
