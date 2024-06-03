import { Test, TestingModule } from '@nestjs/testing';
import { MinistryOfficeController } from './ministry_office.controller';
import { MinistryOfficeService } from './ministry_office.service';

describe('MinistryOfficeController', () => {
  let controller: MinistryOfficeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MinistryOfficeController],
      providers: [MinistryOfficeService],
    }).compile();

    controller = module.get<MinistryOfficeController>(MinistryOfficeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
