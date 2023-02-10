import { TokenService } from '@app/token';
import { JWTAuthPayload, TokenResponse } from '@app/types';
import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class TokenController {
  constructor(
    private readonly tokenService:TokenService
  ) {
  }

  @MessagePattern('sign_auth_tokens')
  public async signAuthTokens(@Payload() data: any): Promise<TokenResponse> {
    return this.tokenService.signAuthTokens(data);
  }

  @MessagePattern('token_create')
  public async signToken(@Payload() data: any): Promise<string> {
    return this.tokenService.signToken(data.id);
  }

  @MessagePattern('token_decode')
  public async verifyJwtToken(
    @Payload() data: string,
  ): Promise<string | JWTAuthPayload> {
    return this.tokenService.verifyJwtToken(data);
  }
}
