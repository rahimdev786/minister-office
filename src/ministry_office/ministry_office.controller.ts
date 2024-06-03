import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MinistryOfficeService } from './ministry_office.service';
import { CreateMinistryOfficeDto } from './dto/create-ministry_office.dto';
import { UpdateMinistryOfficeDto } from './dto/update-ministry_office.dto';

@Controller('ministry-office')
export class MinistryOfficeController {
  constructor(private readonly ministryOfficeService: MinistryOfficeService) {}

  @Post()
  create(@Body() createMinistryOfficeDto: CreateMinistryOfficeDto) {
    return this.ministryOfficeService.create(createMinistryOfficeDto);
  }

  @Get()
  findAll() {
    return this.ministryOfficeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ministryOfficeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMinistryOfficeDto: UpdateMinistryOfficeDto) {
    return this.ministryOfficeService.update(+id, updateMinistryOfficeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ministryOfficeService.remove(+id);
  }
}
