import { FindManyOptions, FindOneOptions, FindOptionsWhere } from "typeorm";
import { BaseEntity } from "@app/database";

interface ServiceInterface<
  K extends Record<string, any>,
  T extends BaseEntity
> {
  create(entity: unknown): Promise<T>;
  find(filterOptions?: FindManyOptions<K>): Promise<T[]>;
  findOne(option: FindOneOptions<K>): Promise<T>;
  update(option: FindOptionsWhere<K>, entity: Partial<T>): Promise<boolean | T>;
  delete(option: FindOneOptions<K>): Promise<boolean | T>;
}

export { ServiceInterface };
