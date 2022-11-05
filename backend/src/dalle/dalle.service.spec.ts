import { Test, TestingModule } from '@nestjs/testing';
import { DalleService } from './dalle.service';

describe('DalleService', () => {
  let service: DalleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DalleService],
    }).compile();

    service = module.get<DalleService>(DalleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
