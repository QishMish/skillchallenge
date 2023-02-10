import { BaseSkillTest, SkillTest } from "@app/types";
import { Injectable } from "@nestjs/common";
import { FindManyOptions, FindOneOptions, FindOptionsWhere } from "typeorm";
import { SkillTestsServiceInterface } from "./interfaces";
import { SkillTestsRepository } from "./skill-test.repository";

@Injectable()
export class SkillTestService implements SkillTestsServiceInterface {
  constructor(private readonly skillTestsRepository: SkillTestsRepository) {}
  create(entity: unknown): Promise<BaseSkillTest> {
    return this.skillTestsRepository.create(entity);
  }
  find(filterOptions?: FindManyOptions<SkillTest>): Promise<BaseSkillTest[]> {
    return this.skillTestsRepository.find(filterOptions);
  }
  findOne(option: FindOneOptions<SkillTest>): Promise<BaseSkillTest> {
    return this.skillTestsRepository.findOne(option);
  }
  update(
    option: FindOptionsWhere<SkillTest>,
    entity: Partial<BaseSkillTest>
  ): Promise<boolean | BaseSkillTest> {
    return this.skillTestsRepository.update(option, entity);
  }
  delete(option: FindOneOptions<SkillTest>): Promise<boolean | BaseSkillTest> {
    return this.skillTestsRepository.create(option);
  }
}