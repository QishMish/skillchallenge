import { Exclude } from "class-transformer";
import { BaseOption, BaseQuestion } from "@app/types";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { QuestionEntity } from "@app/question";

@Entity({ name: "options" })
class OptionEntity implements BaseOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "boolean" })
  isCorrect: boolean;

  @ManyToOne(() => QuestionEntity, (question) => question.options)
  question: BaseQuestion;

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

export { OptionEntity };
