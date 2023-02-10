import { Test, TestingModule } from '@nestjs/testing';
import { SkillTestService } from './skill-test.service';

describe('SkillTestLibService', () => {
  let service: SkillTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkillTestService],
    }).compile();

    service = module.get<SkillTestService>(SkillTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
