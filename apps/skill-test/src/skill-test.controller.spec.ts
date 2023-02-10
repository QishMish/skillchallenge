import { Test, TestingModule } from '@nestjs/testing';
import { SkillTestController } from './skill-test.controller';
import { SkillTestService } from './skill-test.service';

describe('SkillTestController', () => {
  let skillTestController: SkillTestController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SkillTestController],
      providers: [SkillTestService],
    }).compile();

    skillTestController = app.get<SkillTestController>(SkillTestController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(skillTestController.getHello()).toBe('Hello World!');
    });
  });
});
