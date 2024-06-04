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
    console.log(ownerData)
    const createdMinistryOffice = new this.ownerDetailsModel(ownerData).save()
    return  await createdMinistryOffice
  }

  async addRelation(ownerCivilIdNumber: string, updateRelationDto: OwnerRelationsDTO): Promise<OwnerDetails> {
    return await this.ownerDetailsModel.findOneAndUpdate(
      { OwnerCivilIdNumber: ownerCivilIdNumber },
      { $push: { Relations: updateRelationDto } },
      { new: true, useFindAndModify: false , select: '-_id -__v -createdAt -updatedAt'}
    ).exec();
  }


  async updateOwner(ownerCivilIdNumber: string, updateUserDto: OwnerDetailsDTO): Promise<OwnerDetails> {
    const { OwnerCivilIdNumber, Relations, ...updateFields } = updateUserDto;
   return await this.ownerDetailsModel.findOneAndUpdate(
      { OwnerCivilIdNumber: ownerCivilIdNumber },
      { $set: updateFields },
      { new: true, useFindAndModify: false ,select: '-_id -__v -createdAt -updatedAt'}
    ).exec();
  }
  
  async updateRelation(ownerCivilIdNumber: string, relatedCivilIdNumber: string, updateRelationDto: OwnerRelationsDTO): Promise<OwnerDetails> {
    const updatedOwnerDetails = await this.ownerDetailsModel.findOneAndUpdate(
      { 
        OwnerCivilIdNumber: ownerCivilIdNumber,
        "Relations.RelatedCivilIdNumber": relatedCivilIdNumber 
      },
      {
        $set: {
          //"Relations.$.OwnerCivilIdNumber": updateRelationDto.OwnerCivilIdNumber,
          "Relations.$.Notes": updateRelationDto.Notes,
          //"Relations.$.RelatedCivilIdNumber": updateRelationDto.RelatedCivilIdNumber,
          //"Relations.$.RelatedWithOwner": updateRelationDto.RelatedWithOwner,
        },
      },
      { new: true, useFindAndModify: false ,select: '-_id -__v -createdAt -updatedAt'}
    ).exec();
    console.log(updatedOwnerDetails)
    return updatedOwnerDetails;
  }
  
async findbyNoteCivilId(civilId: string, page: number, limit: number): Promise<{
    data: OwnerDetails[],
    totalItems: number,
    currentpage: number,
    totalpages:number
  }> {
    const totalCount = await this.ownerDetailsModel.countDocuments({
      OwnerCivilIdNumber:civilId
    });
    
  console.log("totalCount", totalCount)
    const totalPages = Math.ceil(totalCount / limit);
    const results = await this.ownerDetailsModel
        .find({ OwnerCivilIdNumber: civilId })
        .select('-_id -__v -createdAt -updatedAt')
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
        .select('-_id -__v -createdAt -updatedAt')
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
