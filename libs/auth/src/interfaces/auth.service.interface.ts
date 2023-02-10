import {
  AuthTokenWithCookiesResponse,
  BaseUser,
  SignUpUser,
  JWTAuthPayload,
  AuthTokens,
  AuthCookies,
} from '@app/types';

interface AuthServiceInterface {
  signUpUser(user: SignUpUser): Promise<BaseUser>;
  getAuthorizedUser(email: string, password: string): Promise<BaseUser>;
  generateJwtAccesTokenCookie(
    payload: JWTAuthPayload,
  ): Promise<AuthTokenWithCookiesResponse>;
  generateJwtRefreshTokenCookie(
    payload: JWTAuthPayload,
  ): Promise<AuthTokenWithCookiesResponse>;
  generateAuthCookies(tokens: AuthTokens): AuthCookies
  generateLogOutCookie(): string[];
  setHashedRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<boolean | BaseUser>;
  removeRefreshToken(userId: number): Promise<boolean>;
}

export { AuthServiceInterface };
