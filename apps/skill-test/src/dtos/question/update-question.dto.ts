import { Question, QuestionTypesEnum, SkillTest } from "@app/types";
import {
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

class UpdateQuestionDto implements Question {
  @IsOptional()
  @IsString()
  @MaxLength(512)
  question: string;

  @IsOptional()
  @IsNumber()
  mediaId: number;

  @IsOptional()
  @IsEnum(QuestionTypesEnum)
  @IsIn([...Object.values(QuestionTypesEnum)])
  questionType: QuestionTypesEnum;

  @IsOptional()
  @IsNumber()
  skilltestId: number;
}

export { UpdateQuestionDto };
