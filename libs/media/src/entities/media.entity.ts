import { BaseMedia, MediaTypesEnum, OwnerEnum } from "@app/types";
import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "media" })
class MediaEntity implements BaseMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  key: string;

  @Column({ type: "varchar" })
  url: string;

  @Column({ type: "enum", enum: MediaTypesEnum })
  type: MediaTypesEnum;

  @Column({ type: "enum", enum: OwnerEnum })
  ownerEntity: OwnerEnum;

  @Column({ type: "int", nullable: false })
  ownerId: number;

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

export { MediaEntity };
