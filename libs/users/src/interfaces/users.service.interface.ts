import { BaseUser, ServiceInterface, User } from "@app/types";

interface UsersServiceInterface extends ServiceInterface<User, BaseUser> {
  setHashedRefreshToken(
    userId: number,
    refreshToken: string
  ): Promise<boolean | BaseUser>;
  removeRefreshToken(userId: number): Promise<boolean>;
  checkEmailAvailability(email: string): Promise<boolean>;
  clearResetToken(userId: number): Promise<boolean>;
}

export { UsersServiceInterface };
