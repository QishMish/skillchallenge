import { JwtAuthGuard } from "@app/auth-rpc";
import { SkillTestService } from "@app/skill-test";
import {
  BadGatewayException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  OnApplicationBootstrap,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { CreateSkilltestDto, updateSkilltestDto } from "./dtos";
import { JWTAuthPayload, RoleEnum } from "@app/types";
import { CurrentUser, Role, RoleGuard } from "@app/auth";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { GET_USERS_BY_IDS } from "@app/common";
import { CacheService } from "@app/cache";

@Controller("challenge")
@UseGuards(JwtAuthGuard)
export class SkillTestController implements OnApplicationBootstrap {
  constructor(
    private readonly skilltestService: SkillTestService,
    @Inject("SKILLTEST") private readonly skilltestClient: ClientProxy,
    private readonly cacheService: CacheService
  ) {}

  async onApplicationBootstrap() {
    await this.skilltestClient
      .connect()
      .then(() => console.log("connected to skilltest client"))
      .catch((err) => console.log(err));
  }

  @Get("/")
  @Role(RoleEnum.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @HttpCode(HttpStatus.OK)
  public async getAllSkilltests() {
    const skilltestCache = this.cacheService.get("skilltests", "skilltests");

    if (skilltestCache) {
      console.log("resolving from cache");
      return skilltestCache;
    }

    console.log("resolving from db");

    const skilltests = await this.skilltestService.find({});

    if (!skilltests.length) {
      return [];
    }

    const userIds = skilltests.map((skilltest) => skilltest.createdBy);

    const users = await firstValueFrom(
      this.skilltestClient.send<Record<number, JWTAuthPayload>>(
        GET_USERS_BY_IDS,
        { ids: [...new Set(userIds)] }
      )
    ).catch((err) => console.log(err));

    if (users && !Object.keys(users).length) {
      throw new BadGatewayException();
    }

    const skilltestsWithCreators = skilltests.map((skilltest) => {
      return {
        ...skilltest,
        createdBy: users[skilltest.createdBy],
      };
    });

    this.cacheService.set("skilltests", "skilltests", skilltestsWithCreators);

    return skilltestsWithCreators;
  }

  @Get("/:id")
  @Role(RoleEnum.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @HttpCode(HttpStatus.OK)
  public async getOneSkilltests(@Param("id", ParseIntPipe) id: number) {
    const skilltestCache = await this.cacheService.get(
      "skilltest",
      id.toString()
    );

    console.log(skilltestCache);

    if (skilltestCache) {
      console.log("resolving from cache");
      return skilltestCache;
    }

    console.log("resolving from db");

    const skilltest = await this.skilltestService.findOne({
      where: {
        id,
      },
    });

    if (!skilltest) {
      throw new NotFoundException("Skilltest not found");
    }

    let skilltestsWithCreator = await firstValueFrom<
      Record<number, JWTAuthPayload>
    >(
      this.skilltestClient.send<Record<number, JWTAuthPayload>>(
        GET_USERS_BY_IDS,
        { ids: [skilltest.createdBy] }
      )
    );

    this.cacheService.set("skilltest", id.toString(), {
      ...skilltest,
      creatorId: skilltestsWithCreator[skilltest.createdBy],
    });

    if (!skilltestsWithCreator) {
      throw new BadGatewayException();
    }
    return {
      ...skilltest,
      creatorId: skilltestsWithCreator[skilltest.createdBy],
    };
  }

  @Post("/")
  @Role(RoleEnum.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @HttpCode(HttpStatus.CREATED)
  public createSkilltest(
    @Body() createSkilltestDto: CreateSkilltestDto,
    @CurrentUser() user: JWTAuthPayload
  ) {
    return this.skilltestService.create({
      ...createSkilltestDto,
      createdBy: user.userId,
    });
  }

  @Put("/:id")
  @Role(RoleEnum.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  public updateSkilltest(
    @Body() updateSkilltestDto: updateSkilltestDto,
    @Param("id", ParseIntPipe) id: number,
    @CurrentUser() user: JWTAuthPayload
  ) {
    return this.skilltestService.update(
      {
        id,
        createdBy: user.userId,
      },
      {
        ...updateSkilltestDto,
        createdBy: user.userId,
      }
    );
  }

  @Delete("/:id")
  @Role(RoleEnum.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  public deleteSkilltest(
    @Param("id", ParseIntPipe) id: number,
    @CurrentUser() user: JWTAuthPayload
  ) {
    return this.skilltestService.delete({
      where: {
        id: id,
        createdBy: user.userId,
      },
    });
  }
}
