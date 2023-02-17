import { Exclude } from "class-transformer";
import { BaseRole, BaseUser, RoleEnum } from "@app/types";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({ name: "roles" })
class RoleEntity implements BaseRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: RoleEnum,
    default: RoleEnum.USER,
  })
  public name: RoleEnum;

  @OneToMany(() => UserEntity, (user) => user.role)
  public user: BaseUser[];

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

export { RoleEntity };
