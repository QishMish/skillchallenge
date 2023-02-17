import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { firstValueFrom } from "rxjs";
import { AuthRpcService } from "../auth-rpc.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authRpcService: AuthRpcService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (!req?.cookies?.Authentication) {
      throw new UnauthorizedException();
    }

    const user = await firstValueFrom(
      this.authRpcService.validateAuthToken(req.cookies.Authentication)
    );
    if (!user) {
      req.user = null;
      next();
    }

    req.user = user;
    next();
  }
}
