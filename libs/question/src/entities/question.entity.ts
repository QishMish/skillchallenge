import { Exclude } from "class-transformer";
import { QuestionTypesEnum } from "@app/types";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BaseQuestion } from "@app/types/interfaces/questions";

@Entity({ name: "questions" })
class QuestionEntity implements BaseQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  question: string;

  @Column({
    type: "enum",
    enum: QuestionTypesEnum,
  })
  questionType: QuestionTypesEnum;

  @Column({ type: "timestamp with time zone" })
  expiresAt: Date;

  @Column({ type: "smallint" })
  numberOfQuestions: number;

  @Column({ type: "varchar" })
  media: any;

  @Exclude()
  @CreateDateColumn()
  public createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  public updatedAt: Date;

  @Exclude()
  @DeleteDateColumn()
  public deletedAt: Date;
}

export { QuestionEntity };
