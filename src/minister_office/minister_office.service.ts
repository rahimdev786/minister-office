import { Injectable } from '@nestjs/common';
import { CreateMinistryOfficeDto } from './dto/create-minister_office.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MinistryOffice } from 'src/schemas/minister_office.schema';
import { Model } from 'mongoose';

@Injectable()
export class MinistryOfficeService {
  constructor(
    @InjectModel(MinistryOffice.name)
    private ministryOfficeModel: Model<MinistryOffice>,
  ) {}

  async createMinistryUser(
    createMinistryOfficeDto: CreateMinistryOfficeDto,
  ): Promise<MinistryOffice> {
    //const { civilIdNumber } = createMinistryOfficeDto;
    // const existingUser = await this.ministryOfficeModel
    //   .findOne({ civilIdNumber })
    //   .exec();
    // if (existingUser) {
    //   throw new ConflictException(
    //     `Ministry Office with civilIdNumber ${civilIdNumber} already exists`,
    //   );
    // }
    const createdMinistryOffice = await new this.ministryOfficeModel(
      createMinistryOfficeDto,
    );
    return createdMinistryOffice.save();
  }

  async findbyNoteCivilId(civilId: string): Promise<MinistryOffice[]> {
    if (!civilId) {
      console.log('civilid empty')
    }
    return await this.ministryOfficeModel
      .find({ civilIdNumber: civilId })
      .select('-_id -__v')
      .lean()
      .exec();
  }

  async findbyAllNotes(): Promise<MinistryOffice[]> {
   return await this.ministryOfficeModel
      .find()
      .select('-_id -__v')
      .lean()
      .exec();
  }

}
