import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig } from './env.config';
import {
  OwnerDetails,
  OwnerDetailsSchema,
  OwnerRelationDetailsSchema,
  OwnerRelations,
} from './schemas/ministeroffice.schema';
import { MinistryOfficeController } from './ministeroffice/ministeroffice.controller';
import { MinistryOfficeService } from './ministeroffice/ministeroffice.service';
import { Department, DepartmentSchema } from './schemas/department.schema';
import { DepartmentService } from './ministeroffice/department.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: EnvConfig.test,
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE),
    MongooseModule.forFeature([
      { name: OwnerDetails.name, schema: OwnerDetailsSchema },
    ]),
    MongooseModule.forFeature([
      { name: OwnerRelations.name, schema: OwnerRelationDetailsSchema },
    ]),
    MongooseModule.forFeature([
      { name: Department.name, schema: DepartmentSchema },
    ]),
  ],
  controllers: [MinistryOfficeController],
  providers: [MinistryOfficeService, DepartmentService],
})
export class AppModule {}
