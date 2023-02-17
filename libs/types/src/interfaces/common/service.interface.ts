import { FindManyOptions, FindOneOptions, FindOptionsWhere } from "typeorm";
import { BaseEntity } from "@app/database";

interface ServiceInterface<
  K extends Record<string, any>,
  T extends BaseEntity
> {
  create(entity: K): Promise<T>;
  find(filterOptions?: FindManyOptions<T>): Promise<T[]>;
  findOne(option: FindOneOptions<T>): Promise<T>;
  update(option: FindOptionsWhere<T>, entity: Partial<T>): Promise<boolean | T>;
  delete(option: FindOneOptions<T>): Promise<boolean | T>;
}

export { ServiceInterface };
