import { Module } from "@nestjs/common";
import { SkillTestRepository } from "./skill-test.repository";
import { SkillTestService } from "./skill-test.service";

@Module({
  providers: [SkillTestService, SkillTestRepository],
  exports: [SkillTestService, SkillTestRepository],
})
export class SkillTestLibModule {}
