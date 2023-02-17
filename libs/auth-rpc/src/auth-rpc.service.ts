import { VALIDATE_TOKEN } from "@app/common";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class AuthRpcService {
  constructor(@Inject("AUTH") private readonly authClient: ClientProxy) {}

  public validateAuthToken(accessToken: string) {
    console.log("accessToken", accessToken);
    return this.authClient.send(VALIDATE_TOKEN, {
      accessToken,
    });
  }
}
