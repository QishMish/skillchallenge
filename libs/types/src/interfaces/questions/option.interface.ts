import { BaseEntity } from "@app/database";

interface Option {
  option: string;
  isCorrect: boolean;
}

interface BaseOption extends BaseEntity {
  option: string;
  isCorrect: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export { Option, BaseOption };
