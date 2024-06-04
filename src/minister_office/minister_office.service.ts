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

  async createMinisterUser(
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

 
  async findbyNoteCivilId(civilId: string, page: number, limit: number): Promise<{
    data: MinistryOffice[],
    totalItems: number,
    currentpage: number,
    totalpages:number
  }> {
    const totalCount = await this.ministryOfficeModel.countDocuments({
      civilIdNumber:civilId
    });
    
    const totalPages = Math.ceil(totalCount / limit);
    const results = await this.ministryOfficeModel
        .find({ civilIdNumber: civilId })
        .select('-_id -__v')
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()
        .exec();
    return {  
      currentpage: page,
      totalpages:totalPages,
      totalItems: totalCount,
      data: results,
    };
}
 
  async findbyAllNotes(page: number, limit: number): Promise<{
    data: MinistryOffice[],
    totalItems: number,
    currentpage: number,
    totalpages:number
  }> {
    const totalCount = await this.ministryOfficeModel.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);
    const results = await this.ministryOfficeModel
        .find()
        .select('-_id -__v')
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()
        .exec();
    return {  
      currentpage: page,
      totalpages:totalPages,
      totalItems: totalCount,
      data: results,
    };
}

}
