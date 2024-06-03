import { Module } from '@nestjs/common';
import { MinistryOfficeService } from './ministry_office.service';
import { MinistryOfficeController } from './ministry_office.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MinistryOffice, MinistryOfficeSchema } from 'src/schemas/ministry_office.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: MinistryOffice.name, schema: MinistryOfficeSchema }])],
  controllers: [MinistryOfficeController],
  providers: [MinistryOfficeService],
})
export class MinistryOfficeModule {}
