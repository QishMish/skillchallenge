import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SkillTestEntity } from "./entities";
import { SkillTestRepository } from "./skill-test.repository";
import { SkillTestService } from "./skill-test.service";

@Module({
  imports: [TypeOrmModule.forFeature([SkillTestEntity])],
  providers: [SkillTestService, SkillTestRepository],
  exports: [SkillTestService, SkillTestRepository],
})
export class SkillTestLibModule {}
