import { Module } from '@nestjs/common';
import { SkillTestController } from './skill-test.controller';
import { SkillTestService } from './skill-test.service';

@Module({
  imports: [],
  controllers: [SkillTestController],
  providers: [SkillTestService],
})
export class SkillTestModule {}
