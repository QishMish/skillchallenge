import { CanActivate } from "@nestjs/common";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() === "rpc") {
      // throw new RpcException("Unauthorized");
      console.log("rpcc");
      return true;
    }

    const request = context.switchToHttp().getRequest();
    return !!request.user;
  }
}
