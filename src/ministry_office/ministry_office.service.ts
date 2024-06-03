import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMinistryOfficeDto } from './dto/create-ministry_office.dto';
import { UpdateMinistryOfficeDto } from './dto/update-ministry_office.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MinistryOffice } from 'src/schemas/ministry_office.schema';
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

  async findbyCivilId(civilId: string): Promise<MinistryOffice[]> {
    const ministryOffice = await this.ministryOfficeModel
      .find({ civilIdNumber: civilId })
      .select('-_id -__v')
      .lean()
      .exec();
    return ministryOffice;
  }
}
