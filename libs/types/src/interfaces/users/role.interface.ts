import { BaseEntity } from "@app/database";
import { BaseUser } from "./users.interface";

interface Role {
  name: string;
}

interface BaseRole extends BaseEntity {
  id: number;
  name: string;
  users?: BaseUser[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export { Role, BaseRole };
