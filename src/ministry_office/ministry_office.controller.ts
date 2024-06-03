import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MinistryOfficeService } from './ministry_office.service';
import { CreateMinistryOfficeDto } from './dto/create-ministry_office.dto';
import { UpdateMinistryOfficeDto } from './dto/update-ministry_office.dto';
import { MinistryOffice } from 'src/schemas/ministry_office.schema';

@Controller('ministry-office')
export class MinistryOfficeController {
  constructor(private readonly ministryOfficeService: MinistryOfficeService) {}

  @Post()
  async createMinistryUser(@Body() createMinistryOfficeDto: CreateMinistryOfficeDto) :Promise<MinistryOffice> {
    return this.ministryOfficeService.createMinistryUser(createMinistryOfficeDto);
  }

  @Get()
  findAll() {
    return this.ministryOfficeService.findAll();
  }

  @Get(':civilId')
  findOne(@Param('civilId') civilId: string): Promise<MinistryOffice> {
    return this.ministryOfficeService.findOneByCivilId(civilId );
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
