import { JwtAuthGuard } from "@app/auth-rpc";
import { SkillTestService } from "@app/skill-test";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
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

@Controller("challenge")
@UseGuards(JwtAuthGuard)
export class SkillTestController {
  constructor(
    private readonly skilltestService: SkillTestService,
    @Inject("SKILLTEST") private readonly skilltestClient: ClientProxy
  ) {}

  @Get("/")
  @Role(RoleEnum.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @HttpCode(HttpStatus.OK)
  public async getAllSkilltests() {
    const skilltests = await this.skilltestService.find({});

    const userIds = skilltests.map((skilltest) => skilltest.createdBy);

    const users = await firstValueFrom(
      this.skilltestClient.send<Record<number, JWTAuthPayload>>(
        GET_USERS_BY_IDS,
        { ids: [...new Set(userIds)] }
      )
    );

    const skilltestsWithCreators = skilltests.map((skilltest) => {
      return {
        ...skilltest,
        createdBy: users[skilltest.createdBy],
      };
    });
    return skilltestsWithCreators;
  }

  @Get("/:id")
  @Role(RoleEnum.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @HttpCode(HttpStatus.OK)
  public async getOneSkilltests(@Param("id", ParseIntPipe) id: number) {
    const skilltest = await this.skilltestService.findOne({
      where: {
        id,
      },
    });

    if (!skilltest) {
      throw new NotFoundException("Skilltest not found");
    }

    let skilltestsWithCreator = await firstValueFrom(
      this.skilltestClient.send<Record<number, JWTAuthPayload>>(
        GET_USERS_BY_IDS,
        { ids: [skilltest.createdBy] }
      )
    );

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
