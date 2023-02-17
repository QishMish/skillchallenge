import { SetMetadata } from "@nestjs/common";
import { RoleEnum } from "@app/types";

export const Role = (role: RoleEnum) => SetMetadata("role", role);
