import { ConflictException, Injectable } from '@nestjs/common';
import { OwnerDetailsDTO, OwnerRelationsDTO } from './dto/createMinisteroffice.dto';
import { InjectModel } from '@nestjs/mongoose';
import { OwnerDetails, OwnerRelations } from 'src/schemas/ministeroffice.schema';
import { Model } from 'mongoose';

@Injectable()
export class MinistryOfficeService {
  constructor(
    @InjectModel(OwnerDetails.name)
    private ownerDetailsModel: Model<OwnerDetails>,
     @InjectModel(OwnerRelations.name)
    private ownerRelationsModel: Model<OwnerRelations>,
  ) {}

  async saveOwnerDetails(
    ownerData: OwnerDetailsDTO,
  ): Promise<OwnerDetails> {
    // const existingUser = await this.ownerDetailsModel
    //   .findOne({ OwnerCivilIdNumber:ownerData.OwnerCivilIdNumber})
    //   .exec();
    
    // if (existingUser) {
    //   throw new ConflictException(
    //     `Ministry Office with civilIdNumber ${ownerData.OwnerCivilIdNumber} already exists`,
    //   );
    // }

    console.log(ownerData)
    const createdMinistryOffice = await new this.ownerDetailsModel(
      ownerData,
    );
    return createdMinistryOffice.save();
  }

  async findbyNoteCivilId(civilId: string, page: number, limit: number): Promise<{
    data: OwnerDetails[],
    totalItems: number,
    currentpage: number,
    totalpages:number
  }> {
    const totalCount = await this.ownerDetailsModel.countDocuments({
      civilIdNumber:civilId
    });
    
    const totalPages = Math.ceil(totalCount / limit);
    const results = await this.ownerDetailsModel
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
    data: OwnerDetails[],
    totalItems: number,
    currentpage: number,
    totalpages:number
  }> {
    const totalCount = await this.ownerDetailsModel.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);
    const results = await this.ownerDetailsModel
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
