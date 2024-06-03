import { Test, TestingModule } from '@nestjs/testing';
import { MinistryOfficeService } from './ministry_office.service';

describe('MinistryOfficeService', () => {
  let service: MinistryOfficeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinistryOfficeService],
    }).compile();

    service = module.get<MinistryOfficeService>(MinistryOfficeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
