import { Module } from "@nestjs/common";
import { SkillTestsRepository } from "./skill-test.repository";
import { SkillTestService } from "./skill-test.service";

@Module({
  providers: [SkillTestService, SkillTestsRepository],
  exports: [SkillTestService],
})
export class SkillTestLibModule {}
