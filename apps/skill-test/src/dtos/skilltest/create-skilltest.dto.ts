import { SkillTest } from "@app/types";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

class CreateSkilltestDto implements Omit<SkillTest, "createdBy" | "expiresAt"> {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @IsString()
  subtitle: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  time: number;

  @IsOptional()
  @IsNumber()
  numberOfQuestions: number;
}

export { CreateSkilltestDto };
