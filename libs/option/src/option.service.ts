import { BaseOption, Option } from "@app/types";
import { Injectable } from "@nestjs/common";
import { FindManyOptions, FindOneOptions, FindOptionsWhere } from "typeorm";
import { OptionServiceInterface } from "./interfaces";
import { OptionsRepository } from "./option.repository";

@Injectable()
export class OptionService implements OptionServiceInterface {
  constructor(private readonly optionsRepository: OptionsRepository) {}

  create(entity: unknown): Promise<BaseOption> {
    return this.optionsRepository.create(entity);
  }
  find(filterOptions?: FindManyOptions<Option>): Promise<BaseOption[]> {
    return this.optionsRepository.find(filterOptions);
  }
  findOne(option: FindOneOptions<Option>): Promise<BaseOption> {
    return this.optionsRepository.findOne(option);
  }
  update(
    option: FindOptionsWhere<Option>,
    entity: Partial<BaseOption>
  ): Promise<boolean | BaseOption> {
    return this.optionsRepository.update(option, entity);
  }
  delete(option: FindOneOptions<Option>): Promise<boolean | BaseOption> {
    return this.optionsRepository.delete(option);
  }
}
