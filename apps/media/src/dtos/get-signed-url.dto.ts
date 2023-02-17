import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsIn,
  IsEnum,
  IsOptional,
} from "class-validator";
import { MediaTypesEnum } from "@app/types";

export class GetPreSignedUrlDto {
  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsString()
  @IsNotEmpty()
  contentType: string;

  @IsNumber()
  @IsOptional()
  contentLength: number;

  @IsNotEmpty()
  @IsEnum(MediaTypesEnum)
  @IsIn([...Object.values(MediaTypesEnum)])
  mediaType: MediaTypesEnum;
}
