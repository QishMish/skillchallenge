import { BaseEntity } from "@app/database";
import { QuestionTypesEnum } from "@app/types/enums";
import { BaseSkillTest, SkillTest } from "../skill-tests";
import { BaseOption, Option } from "./option.interface";

interface Question {
  id?: number;
  question: string;
  mediaId: number;
  questionType: QuestionTypesEnum;
  options?: Option[];
  skilltest?: SkillTest;
}

interface BaseQuestion extends BaseEntity {
  id: number;
  question: string;
  mediaId: number;
  questionType: QuestionTypesEnum;
  options: BaseOption[];
  skilltest: BaseSkillTest;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export { Question, BaseQuestion };
