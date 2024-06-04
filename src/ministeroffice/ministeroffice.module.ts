import { Module } from '@nestjs/common';
import { MinistryOfficeService } from './ministeroffice.service';
import { MinistryOfficeController } from './ministeroffice.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  OwnerDetails,
  OwnerDetailsSchema,
  OwnerRelationDetailsSchema,
  OwnerRelations,
} from 'src/schemas/ministeroffice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OwnerDetails.name, schema: OwnerDetailsSchema },
    ]),
    MongooseModule.forFeature([
      { name: OwnerRelations.name, schema:  OwnerRelationDetailsSchema},
    ]),
  ],
  controllers: [MinistryOfficeController],
  providers: [MinistryOfficeService],
})
export class MinistryOfficeModule {}
