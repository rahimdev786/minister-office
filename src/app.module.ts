import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MinistryOfficeModule } from './ministeroffice/ministeroffice.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal:true
     }),
    MongooseModule.forRoot('mongodb://localhost:27017/minster_office'),
    MinistryOfficeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {

    console.log(process.env.DATABASE)
    console.log(process.env.HOST)
    console.log(process.env.PORT)
  }
}
