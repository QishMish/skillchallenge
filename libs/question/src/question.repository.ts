import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityRepository } from "@app/database";
import { Repository } from "typeorm";
import { QuestionEntity } from "./entities";

@Injectable()
export class QuestionRepository extends EntityRepository<QuestionEntity> {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionEntity: Repository<QuestionEntity>
  ) {
    super(questionEntity);
  }
}
