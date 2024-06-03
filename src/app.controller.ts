import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('ministry_office')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
