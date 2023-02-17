import { JwtAuthGuard } from "@app/auth-rpc";
import { SkillTestService } from "@app/skill-test";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import {
  CreateQuestionDto,
  CreateSkilltestDto,
  UpdateQuestionDto,
} from "./dtos";
import {
  BaseSkillTest,
  BaseUser,
  JWTAuthPayload,
  RoleEnum,
} from "@app/types";
import { CurrentUser, Role, RoleGuard } from "@app/auth";
import { QuestionService } from "@app/question";

@Controller("question")
@UseGuards(JwtAuthGuard)
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly skillTestService: SkillTestService
  ) {}

  @Get("/")
  @Role(RoleEnum.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @HttpCode(HttpStatus.OK)
  public getAllQuestions() {
    return this.questionService.find();
  }

  @Get("/:id")
  @Role(RoleEnum.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @HttpCode(HttpStatus.OK)
  public getOneQuestion(@Param("id", ParseIntPipe) id: number) {
    return this.questionService.findOne({
      where: {
        id,
      },
    });
  }

  @Post("/")
  @Role(RoleEnum.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @HttpCode(HttpStatus.CREATED)
  public async createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
    @CurrentUser() user: JWTAuthPayload
  ) {
    //todo validate skilltest existance and also more than one correct answer
    const skilltest = await this.skillTestService.findOne({
      where: {
        id: createQuestionDto.skilltestId,
      },
    });

    if (!skilltest) {
      throw new NotFoundException("Skilltest not found");
    }

    return this.questionService.create({
      ...createQuestionDto,
      skilltest: skilltest,
    });
  }

  @Put("/:id")
  @Role(RoleEnum.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  public async updateQuestion(
    @Body() updateQuestionDto: UpdateQuestionDto,
    @Param("id", ParseIntPipe) id: number
  ) {
    let skilltest: BaseSkillTest;

    if (!updateQuestionDto.skilltestId) {
      return this.questionService.update(
        {
          id,
        },
        updateQuestionDto
      );
    }

    skilltest = await this.skillTestService.findOne({
      where: {
        id: updateQuestionDto.skilltestId,
      },
    });

    if (!skilltest) {
      throw new NotFoundException("Skilltest not found");
    }

    delete updateQuestionDto.skilltestId;

    return this.questionService.update(
      {
        id,
      },
      {
        ...updateQuestionDto,
        skilltest: skilltest,
      }
    );
  }

  @Delete("/:id")
  @Role(RoleEnum.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  deleteQuestion(
    @Param("id", ParseIntPipe) id: number,
    @CurrentUser() user: JWTAuthPayload
  ) {
    return this.questionService.delete({
      where: {
        id: id,
      },
    });
  }
}
