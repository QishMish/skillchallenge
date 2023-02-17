import { BaseEntity } from "@app/database";
import { MediaTypesEnum } from "@app/types/enums";

interface Media {
  url: string;
  key: string;
  type: MediaTypesEnum;
}

interface BaseMedia extends BaseEntity {
  url: string;
  key: string;
  type: MediaTypesEnum;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export { Media, BaseMedia };
