import { Exclude } from "class-transformer";
import { BaseSkillTest, QuestionTypesEnum } from "@app/types";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BaseOption, BaseQuestion } from "@app/types/interfaces/questions";
import { OptionEntity } from "@app/option";
import { SkillTestEntity } from "@app/skill-test";

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

  @Column({ type: "int", nullable: true })
  mediaId: number;

  @ManyToOne(() => SkillTestEntity, (skilltest) => skilltest.questions)
  public skilltest: BaseSkillTest;

  @OneToMany(() => OptionEntity, (options) => options.question, {
    eager: true,
  })
  options: BaseOption[];

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
