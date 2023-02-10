import { Exclude } from "class-transformer";
import { BaseOption } from "@app/types";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "options" })
class OptionEntity implements BaseOption {
  @Column({ type: "varchar" })
  option: string;

  @Column({ type: "boolean" })
  isCorrect: boolean;

  @PrimaryGeneratedColumn()
  id: number;

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
