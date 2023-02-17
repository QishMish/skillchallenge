import { RequestWithUser } from "./interfaces/request-with-user";
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  OnApplicationBootstrap,
  Post,
  Req,
} from "@nestjs/common";
import { SignUpDto } from "./dtos";
import { AUTH_SERVICE, SignOutResponseInterceptor } from "@app/auth";
import { AuthServiceInterface, JwtAuthGuard } from "@app/auth";
import { UseGuards } from "@nestjs/common";
import { User } from "@app/auth";
import { BaseUser, AuthTokens } from "@app/types";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "@nestjs/common";
import { UseInterceptors } from "@nestjs/common";
import { ClassSerializerInterceptor } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { ClientProxy, MessagePattern, Payload } from "@nestjs/microservices";
import { firstValueFrom, lastValueFrom } from "rxjs";
import { SIGN_AUTH_TOKENS, VALIDATE_TOKEN } from "@app/common";

@Controller()
export class AuthController implements OnApplicationBootstrap {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: AuthServiceInterface,
    @Inject("MAILER") private readonly mailClient: ClientProxy,
    @Inject("TOKEN") private readonly tokenClient: ClientProxy
  ) {}
  async onApplicationBootstrap() {
    await this.mailClient.connect().catch((err) => console.log(err));
  }

  @Post("sign-up")
  @Throttle(25, 60)
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  public async signUp(
    @Body() signUpUser: SignUpDto,
    @Req() request: RequestWithUser<BaseUser>
  ): Promise<BaseUser> {
    const user = await this.authService.signUpUser(signUpUser);

    const { id: userId, name, email } = user;

    // const { cookie: accessCookie } =
    //   await this.authService.generateJwtAccesTokenCookie({
    //     userId,
    //     name,
    //     email,
    //   });
    // const { cookie: refreshCookie, token: refreshToken } =
    //   await this.authService.generateJwtRefreshTokenCookie({
    //     userId,
    //     name,
    //     email,
    //   });

    const { accessToken, refreshToken } = await firstValueFrom(
      this.tokenClient.send(SIGN_AUTH_TOKENS, {
        id: userId,
        name: name,
        email: email,
      })
    );

    const { accessCookie, refreshCookie } =
      await this.authService.generateAuthCookies({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });

    await this.authService.setHashedRefreshToken(userId, refreshToken);

    request.res.setHeader("Set-Cookie", [accessCookie, refreshCookie]);

    this.mailClient.emit("send_email", {
      to: user.email,
      subject: "Welcome",
      text: "Welcome to skillchallenge",
    });

    return user;
  }

  @Post("sign-in")
  @Throttle(25, 60)
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard("local"))
  @HttpCode(HttpStatus.OK)
  public async signIn(
    @Request() { user, res }: RequestWithUser<BaseUser>
  ): Promise<BaseUser> {
    const { id: userId, name, email } = user;

    // const { cookie: accessCookie } =
    //   await this.authService.generateJwtAccesTokenCookie({
    //     userId,
    //     name,
    //     email,
    //   });

    // const { cookie: refreshCookie, token: refreshToken } =
    //   await this.authService.generateJwtRefreshTokenCookie({
    //     userId,
    //     name,
    //     email,
    //   });

    const { accessToken, refreshToken } = await lastValueFrom(
      this.tokenClient.send(SIGN_AUTH_TOKENS, {
        id: userId,
        name: name,
        email: email,
      })
    );

    const { accessCookie, refreshCookie } =
      await this.authService.generateAuthCookies({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });

    await this.authService.setHashedRefreshToken(userId, refreshToken);

    res.setHeader("Set-Cookie", [accessCookie, refreshCookie]);
    this.mailClient.emit("send_email", {
      to: user.email,
      subject: "Welcome",
      text: "Welcome to skillchallenge",
    });

    return user;
  }

  @Post("refresh-token")
  @Throttle(25, 60)
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard("jwt-refresh-token"))
  @HttpCode(HttpStatus.ACCEPTED)
  public async refreshToken(
    @Request() { user, res }: RequestWithUser<BaseUser>
  ) {
    const { id: userId, name, email } = user;

    const { cookie: accessCookie } =
      await this.authService.generateJwtAccesTokenCookie({
        userId,
        name,
        email,
      });

    const { cookie: refreshCookie, token: refreshToken } =
      await this.authService.generateJwtRefreshTokenCookie({
        userId,
        name,
        email,
      });

    await this.authService.setHashedRefreshToken(userId, refreshToken);

    res.setHeader("Set-Cookie", [accessCookie, refreshCookie]);

    return user;
  }

  @Get("sign-out")
  @Throttle(25, 60)
  @UseInterceptors(SignOutResponseInterceptor)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  public async signOut(@User() user: BaseUser): Promise<void> {
    await this.authService.removeRefreshToken(user.id);
    return void 0;
  }

  @Get("current-user")
  @Throttle(100, 60)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  public currentUser(@User() user: BaseUser): BaseUser {
    return user;
  }

  @MessagePattern(VALIDATE_TOKEN)
  @Throttle(100, 60)
  @HttpCode(HttpStatus.OK)
  public validateToken(
    @Payload() payload: Omit<AuthTokens, "refreshToken">
  ): Promise<BaseUser> {
    return this.authService.validateAccessToken(payload.accessToken);
  }
}
