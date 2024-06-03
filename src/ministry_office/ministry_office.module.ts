import { Module } from '@nestjs/common';
import { MinistryOfficeService } from './ministry_office.service';
import { MinistryOfficeController } from './ministry_office.controller';

@Module({
  controllers: [MinistryOfficeController],
  providers: [MinistryOfficeService],
})
export class MinistryOfficeModule {}
