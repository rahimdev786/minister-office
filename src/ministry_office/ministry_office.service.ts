import { Injectable } from '@nestjs/common';
import { CreateMinistryOfficeDto } from './dto/create-ministry_office.dto';
import { UpdateMinistryOfficeDto } from './dto/update-ministry_office.dto';

@Injectable()
export class MinistryOfficeService {
  create(createMinistryOfficeDto: CreateMinistryOfficeDto) {
    return 'This action adds a new ministryOffice';
  }

  findAll() {
    return `This action returns all ministryOffice`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ministryOffice`;
  }

  update(id: number, updateMinistryOfficeDto: UpdateMinistryOfficeDto) {
    return `This action updates a #${id} ministryOffice`;
  }

  remove(id: number) {
    return `This action removes a #${id} ministryOffice`;
  }
}
