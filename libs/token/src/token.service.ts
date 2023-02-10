import { JWTAuthPayload, TokenResponse } from "@app/types";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService, JwtSignOptions, JwtVerifyOptions } from "@nestjs/jwt";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  public async signAuthTokens(
    payload: JWTAuthPayload,
    options?: JwtSignOptions
  ): Promise<TokenResponse> {

    Logger.log("Signing tokens for user:", payload)

    const jwtAccessSecret =
      options?.secret || this.configService.get("JWT_SECRET");
    const jwtAccessExpiresIn =
      options?.expiresIn || this.configService.get("JWT_EXPIRATION_TIME") + "s";

    const jwtRefreshSecret =
      options?.secret || this.configService.get("JWT_REFRESH_TOKEN_SECRET");
    const jwtRefreshExpiresIn =
      options?.expiresIn ||
      this.configService.get("JWT_REFRESH_TOKEN_EXPIRATION_TIME") + "s";

    const accessTokenPromise = this.jwtService.signAsync(payload, {
      secret: jwtAccessSecret,
      expiresIn: jwtAccessExpiresIn,
    });

    const refreshTokenPromise = this.jwtService.signAsync(payload, {
      secret: jwtRefreshSecret,
      expiresIn: jwtRefreshExpiresIn,
    });

    const [accessToken, refreshToken] = await Promise.all([
      accessTokenPromise,
      refreshTokenPromise,
    ]);

    return { accessToken, refreshToken };
  }

  public signToken(
    payload: JWTAuthPayload,
    options?: JwtSignOptions
  ): Promise<string> {
    const secret = options?.secret || this.configService.get("JWT_SECRET");
    const expiresIn =
      options?.expiresIn || this.configService.get("JWT_EXPIRATION_TIME") + "s";
    return this.jwtService.signAsync(payload, {
      secret,
      expiresIn,
    });
  }

  public verifyJwtToken(
    token: string,
    options?: JwtVerifyOptions
  ): Promise<JWTAuthPayload> {
    const secret = options?.secret || this.configService.get("JWT_SECRET");

    return this.jwtService.verifyAsync(token, {
      secret: secret,
    });
  }
}
