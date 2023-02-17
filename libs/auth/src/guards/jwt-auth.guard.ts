import { UnauthorizedException } from "@nestjs/common";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any
  ): TUser {
    if (err || !user) {
      if (context.getType() === "rpc") {
        throw new RpcException("Unauthorized");
      }
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
