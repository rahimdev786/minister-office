import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MinistryOfficeModule } from './ministeroffice/ministeroffice.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    //dev
    // ConfigModule.forRoot({
    //   envFilePath: '.env.local',
    //   isGlobal: true,
    // }),

    // for test
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
    }),

    // for production
    // ConfigModule.forRoot({
    //   envFilePath: '.env.prod',
    //   isGlobal:true
    // }),

    MinistryOfficeModule,
    MongooseModule.forRoot(process.env.DATABASE),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}
