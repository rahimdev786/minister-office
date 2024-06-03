import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MinistryOfficeModule } from './minister_office/minister_office.module';
import { MONGODB_URI } from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_URI),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MinistryOfficeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
