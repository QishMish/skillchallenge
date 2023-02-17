import { OptionRepository } from "@app/option";
import { SkillTestRepository } from "@app/skill-test";
import { BaseQuestion, Question } from "@app/types";
import { Injectable } from "@nestjs/common";
import { FindManyOptions, FindOneOptions, FindOptionsWhere } from "typeorm";
import { QuestionsServiceInterface } from "./interfaces";
import { QuestionRepository } from "./question.repository";

@Injectable()
export class QuestionService implements QuestionsServiceInterface {
  constructor(
    private readonly questionsRepository: QuestionRepository,
    private readonly optionRepository: OptionRepository
  ) {}
  async create(entity: Question): Promise<BaseQuestion> {
    const options = await this.optionRepository.bulkCreate(entity.options);
    return this.questionsRepository.create({
      ...entity,
      options: options,
    });
  }
  find(filterOptions?: FindManyOptions<Question>): Promise<BaseQuestion[]> {
    return this.questionsRepository.find(filterOptions);
  }
  findOne(option: FindOneOptions<Question>): Promise<BaseQuestion> {
    return this.questionsRepository.findOne(option);
  }
  update(
    option: FindOptionsWhere<Question>,
    entity: Partial<BaseQuestion>
  ): Promise<boolean | BaseQuestion> {
    return this.questionsRepository.update(option, entity);
  }
  delete(option: FindOneOptions<Question>): Promise<boolean | BaseQuestion> {
    return this.questionsRepository.delete(option);
  }
}
