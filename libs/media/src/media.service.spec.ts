import { Test, TestingModule } from '@nestjs/testing';
import { MediaLibService } from './media.service';

describe('MediaLibService', () => {
  let service: MediaLibService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaLibService],
    }).compile();

    service = module.get<MediaLibService>(MediaLibService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
