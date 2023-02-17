import { Option, Question, QuestionTypesEnum, SkillTest } from "@app/types";
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from "class-validator";

class CreateQuestionDto implements Question {
  @IsNotEmpty()
  @IsString()
  @MaxLength(512)
  question: string;

  @IsOptional()
  @IsNumber()
  mediaId: any;

  @IsNotEmpty()
  @IsEnum(QuestionTypesEnum)
  @IsIn([...Object.values(QuestionTypesEnum)])
  questionType: QuestionTypesEnum;

  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  options?: Option[];

  @IsNotEmpty()
  @IsNumber()
  skilltestId: number;
}

class CreateOptionDto implements Option {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name: string;

  @IsNotEmpty()
  @IsString()
  isCorrect: boolean;


  @IsOptional()
  @IsNumber()
  mediaId: any;
}

export { CreateQuestionDto, CreateOptionDto };
