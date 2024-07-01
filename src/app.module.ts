import { Module } from '@nestjs/common';
import { MinistryOfficeModule } from './ministeroffice/ministeroffice.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DepartmentModule } from './department/department.module';
import { EnvConfig } from './env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: EnvConfig.dev,
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE),
    MinistryOfficeModule,
    DepartmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
