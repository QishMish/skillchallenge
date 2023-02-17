import { BaseEntity } from "@app/database";
import { BaseQuestion, Question } from "./question.interface";

interface Option {
  id?: number;
  name: string;
  isCorrect: boolean;
  question?: Question;
}

interface BaseOption extends BaseEntity {
  id: number;
  name: string;
  isCorrect: boolean;
  question: BaseQuestion;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export { Option, BaseOption };
