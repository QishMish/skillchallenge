import { BaseEntity } from '@app/database';

interface SkillTest {
  title: string;
  subtitle: string;
  description: string;
  time: number;
  numberOfQuestions: number;
}

interface BaseSkillTest extends BaseEntity {
  title: string;
  subtitle: string;
  description: string;
  time: number;
  numberOfQuestions: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export { SkillTest, BaseSkillTest };
