import { Exclude } from "class-transformer";
import { BaseUser } from "@app/types";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BaseSkillTest } from "@app/types";

@Entity({ name: "skill_tests" })
class SkillTestEntity implements BaseSkillTest {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "varchar" })
  subtitle: string;

  @Column({ type: "varchar" })
  description: string;

  @Column({ type: "integer" })
  time: number;

  @Column({ type: "timestamp with time zone" })
  expiresAt: Date;

  @Column({ type: "smallint" })
  numberOfQuestions: number;

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
