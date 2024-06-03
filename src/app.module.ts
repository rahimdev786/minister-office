import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MinistryOfficeModule } from './ministry_office/ministry_office.module';

@Module({
  imports: [MinistryOfficeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
