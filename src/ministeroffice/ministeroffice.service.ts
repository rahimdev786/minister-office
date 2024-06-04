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
      { new: true, useFindAndModify: false }
    ).exec();
  }


  async updateOwner(ownerCivilIdNumber: string, updateUserDto: OwnerDetailsDTO): Promise<OwnerDetails> {
    const { OwnerCivilIdNumber, Relations, ...updateFields } = updateUserDto;
   return await this.ownerDetailsModel.findOneAndUpdate(
      { OwnerCivilIdNumber: ownerCivilIdNumber },
      { $set: updateFields },
      { new: true, useFindAndModify: false }
    ).exec();
  }

async updateRelation(
    ownerId: string,
    relatedId: string,
    updateData: Partial<OwnerRelationsDTO>,
  ): Promise<OwnerDetails | null> {
    return await this.ownerDetailsModel.findByIdAndUpdate(
      ownerId,
      {
        $set: {
          Relations: {
            $map: {
              input: '$Relations',
              as: 'relation',
              in: {
                $cond: [
                  { $and: [{ 'relation.OwnerCivilIdNumber': ownerId }, { 'relation.RelatedCivilIdNumber': relatedId }] },
                  { $mergeObjects: ['$$relation', updateData] },
                  '$$relation',
                ],
              },
            },
          },
        },
      },
      { new: true }, // Return the updated document
    );
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
