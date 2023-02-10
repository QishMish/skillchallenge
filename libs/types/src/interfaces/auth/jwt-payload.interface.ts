interface JWTAuthPayload {
  userId: number;
  email: string;
  name: string;
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

interface AuthTokens extends TokenResponse {}

interface AuthCookies {
  accessCookie: string;
  refreshCookie: string;
}

export { JWTAuthPayload, TokenResponse, AuthTokens, AuthCookies };
