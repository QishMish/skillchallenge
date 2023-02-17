import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RoleEnum } from "@app/types";

import { Observable } from "rxjs";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRole: RoleEnum = this.reflector.get(
      "role",
      context.getHandler()
    );

    if (!requiredRole) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    return requiredRole.toString() === user.role.toString();
  }
}
