import { Module } from '@nestjs/common';
import { MinistryOfficeService } from './minister_office.service';
import { MinistryOfficeController } from './minister_office.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MinistryOffice,
  MinistryOfficeSchema,
} from 'src/schemas/minister_office.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MinistryOffice.name, schema: MinistryOfficeSchema },
    ]),
  ],
  controllers: [MinistryOfficeController],
  providers: [MinistryOfficeService],
})
export class MinistryOfficeModule {}
