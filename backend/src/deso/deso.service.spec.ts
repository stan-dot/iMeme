import { Test, TestingModule } from '@nestjs/testing';
import { DesoService } from './deso.service';

describe('DesoService', () => {
  let service: DesoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesoService],
    }).compile();

    service = module.get<DesoService>(DesoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
