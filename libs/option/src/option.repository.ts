import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityRepository } from "@app/database";
import { Repository } from "typeorm";
import { OptionEntity } from "./entities";

@Injectable()
export class OptionRepository extends EntityRepository<OptionEntity> {
  constructor(
    @InjectRepository(OptionEntity)
    private readonly optionEntity: Repository<OptionEntity>
  ) {
    super(optionEntity);
  }
}
