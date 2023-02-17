import { Exclude } from "class-transformer";
import { BaseQuestion } from "@app/types";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BaseSkillTest } from "@app/types";
import { QuestionEntity } from "@app/question";

@Entity({ name: "skill_tests" })
class SkillTestEntity implements BaseSkillTest {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: "varchar" })
  public title: string;

  @Column({ type: "varchar" })
  public subtitle: string;

  @Column({ type: "varchar" })
  public description: string;

  @Column({ type: "integer", nullable: true })
  public time: number;

  @Column({ type: "timestamp with time zone", nullable: true })
  public expiresAt: Date;

  @Column({ type: "smallint", default: 0 })
  public numberOfQuestions: number;

  @Column({ type: "int", nullable: true })
  public createdBy: number;

  @OneToMany(() => QuestionEntity, (questions) => questions.skilltest, {
    eager: true,
  })
  public questions: BaseQuestion[];

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

export { SkillTestEntity };
