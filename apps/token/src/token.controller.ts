import { JwtAuthGuard } from "@app/auth-rpc";
import { SIGN_AUTH_TOKENS, TOKEN_CREATE, TOKEN_DECODE } from "@app/common";
import { TokenService } from "@app/token";
import { JWTAuthPayload, TokenResponse } from "@app/types";
import { Controller, Get, UseGuards } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller("/")
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @MessagePattern(SIGN_AUTH_TOKENS)
  public async signAuthTokens(@Payload() data: any): Promise<TokenResponse> {
    return this.tokenService.signAuthTokens(data);
  }

  @MessagePattern(TOKEN_CREATE)
  public async signToken(@Payload() data: any): Promise<string> {
    return this.tokenService.signToken(data.id);
  }

  @MessagePattern(TOKEN_DECODE)
  public async verifyJwtToken(
    @Payload() data: string
  ): Promise<string | JWTAuthPayload> {
    return this.tokenService.verifyJwtToken(data);
  }
}
