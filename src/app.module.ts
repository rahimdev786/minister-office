import { Module } from '@nestjs/common';
import { MinistryOfficeModule } from './ministeroffice/ministeroffice.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [
    //dev
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
    }),

    // for test
    // ConfigModule.forRoot({
    //   envFilePath: '.env.test',
    //   isGlobal: true,
    // }),

    // for production
    // ConfigModule.forRoot({
    //   envFilePath: '.env.prod',
    //   isGlobal:true
    // }),

    MongooseModule.forRoot(process.env.DATABASE),
    MinistryOfficeModule,
    DepartmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
