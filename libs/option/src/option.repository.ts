import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityRepository } from "@app/database";
import { Repository } from "typeorm";
import { OptionEntity } from "./entities";
import { Option } from "@app/types";

@Injectable()
export class OptionRepository extends EntityRepository<OptionEntity> {
  constructor(
    @InjectRepository(OptionEntity)
    private readonly optionEntity: Repository<OptionEntity>
  ) {
    super(optionEntity);
  }

  public bulkCreate(options: Option[]): Promise<OptionEntity[]> {
    return this.entityRepository
      .createQueryBuilder()
      .insert()
      .into(OptionEntity)
      .values(options)
      .execute()
      .then((result) => result.raw);
  }
}
