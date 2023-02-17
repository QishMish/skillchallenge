import { BaseEntity } from "@app/database";
import { BaseRole, Role } from "./role.interface";

interface User {
  name: string;
  email: string;
  password: string;
  role: Role;
}

interface BaseUser extends BaseEntity {
  id: number;
  name: string;
  email: string;
  isEmailConfirmed: boolean;
  password: string;
  passwordResetToken?: string;
  hashedRefreshToken?: string;
  role: BaseRole;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export { User, BaseUser };
