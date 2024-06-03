import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMinistryOfficeDto } from './dto/create-ministry_office.dto';
import { UpdateMinistryOfficeDto } from './dto/update-ministry_office.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MinistryOffice } from 'src/schemas/ministry_office.schema';
import { Model } from 'mongoose';

@Injectable()
export class MinistryOfficeService {
  constructor(@InjectModel(MinistryOffice.name) private ministryOfficeModel: Model<MinistryOffice>) {}


  async create(createMinistryOfficeDto: CreateMinistryOfficeDto): Promise<MinistryOffice> {
    const createdMinistryOffice = new this.ministryOfficeModel(createMinistryOfficeDto);
    return createdMinistryOffice.save();
  }

  findAll() {
    return `This action returns all ministryOffice`;
  }

 
  async findOne(id: string): Promise<MinistryOffice> {
    const ministryOffice = await this.ministryOfficeModel.findById(id).exec();
    if (!ministryOffice) {
      throw new NotFoundException(`Ministry Office with ID ${id} not found`);
    }
    return ministryOffice;
  }

  
  update(id: number, updateMinistryOfficeDto: UpdateMinistryOfficeDto) {
    return `This action updates a #${id} ministryOffice`;
  }

  remove(id: number) {
    return `This action removes a #${id} ministryOffice`;
  }
}
