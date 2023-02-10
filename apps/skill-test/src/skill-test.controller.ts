import { Controller, Get } from '@nestjs/common';
import { SkillTestService } from './skill-test.service';

@Controller()
export class SkillTestController {
  constructor(private readonly skillTestService: SkillTestService) {}

  @Get()
  getHello(): string {
    return this.skillTestService.getHello();
  }
}
