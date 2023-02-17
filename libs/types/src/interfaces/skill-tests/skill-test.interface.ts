import { BaseEntity } from "@app/database";
import { BaseQuestion, Question } from "../questions";

interface SkillTest {
  id?: number;
  title: string;
  subtitle: string;
  description: string;
  time?: number;
  numberOfQuestions?: number;
  expiresAt?: Date;
  createdBy: number;
  questions?: Question[];
}

interface BaseSkillTest extends BaseEntity {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  time: number;
  numberOfQuestions: number;
  expiresAt: Date;
  createdBy: number;
  questions: BaseQuestion[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export { SkillTest, BaseSkillTest };
