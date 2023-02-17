import { Exclude } from "class-transformer";
import { BaseRole, BaseUser } from "@app/types";
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
import { RoleEntity } from "./role.entity";

@Entity({ name: "users" })
class UserEntity implements BaseUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false })
  public name: string;

  @Column({ type: "varchar", nullable: false })
  public email: string;

  @Column({ type: "boolean", default: false })
  public isEmailConfirmed: boolean;

  @Exclude()
  @Column({ type: "varchar", nullable: false })
  public password: string;

  @Exclude()
  @Column({ type: "varchar", nullable: true })
  public passwordResetToken: string;

  @Exclude()
  @Column({ type: "varchar", nullable: true })
  public hashedRefreshToken: string;

  @ManyToOne(() => RoleEntity, (role) => role.user, { eager: true })
  public role: BaseRole;

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

export { UserEntity };
