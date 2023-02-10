import { BaseQuestion, Question } from "@app/types";
import { Injectable } from "@nestjs/common";
import { FindManyOptions, FindOneOptions, FindOptionsWhere } from "typeorm";
import { QuestionsServiceInterface } from "./interfaces";
import { QuestionsRepository } from "./question.repository";

@Injectable()
export class QuestionService implements QuestionsServiceInterface {
  constructor(private readonly questionsRepository: QuestionsRepository) {}
  create(entity: unknown): Promise<BaseQuestion> {
    return this.questionsRepository.create(entity);
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
