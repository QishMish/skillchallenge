import { OptionModule } from "@app/option";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuestionEntity } from "./entities";
import { QuestionRepository } from "./question.repository";
import { QuestionService } from "./question.service";

@Module({
  imports: [OptionModule, TypeOrmModule.forFeature([QuestionEntity])],
  providers: [QuestionService, QuestionRepository],
  exports: [QuestionService, QuestionRepository],
})
export class QuestionModule {}
