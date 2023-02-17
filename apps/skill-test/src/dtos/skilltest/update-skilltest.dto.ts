import { SkillTest } from "@app/types";
import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

class updateSkilltestDto implements Omit<SkillTest, "createdBy" | "expiresAt"> {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsString()
  subtitle: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  time: number;

  @IsOptional()
  @IsNumber()
  numberOfQuestions: number;
}

export { updateSkilltestDto };
