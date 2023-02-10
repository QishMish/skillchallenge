import { BaseEntity } from "@app/database";
import { QuestionTypesEnum } from "@app/types/enums";

interface Question {
  question: string;
  media: any;
  questionType: QuestionTypesEnum;
}

interface BaseQuestion extends BaseEntity {
  question: string;
  media: any;
  questionType: QuestionTypesEnum;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export { Question, BaseQuestion };
