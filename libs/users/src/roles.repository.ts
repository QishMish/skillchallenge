import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityRepository } from "@app/database";
import { Repository } from "typeorm";
import { RoleEntity } from "./entities/role.entity";
import { Role, RoleEnum } from "@app/types";

@Injectable()
export class RolesRepository extends EntityRepository<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleEntity: Repository<RoleEntity>
  ) {
    super(roleEntity);
  }

  async findOrCreate(role: Role) {
    const { name } = role;

    const roleExist = await this.findOne({
      where: {
        name: RoleEnum[name],
      },
    });

    if (roleExist) return roleExist;

    return this.create({
      name: name,
    });
  }
}
