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
  ) { }

  async saveOwnerDetails2(ownerData: OwnerDetailsDTO): Promise<OwnerDetails> {
    // Check if the OwnerDetails already exist
    let existingOwnerDetails = await this.ownerDetailsModel.findOne({ OwnerCivilIdNumber: ownerData.OwnerCivilIdNumber });

    if (!existingOwnerDetails) {
      // If OwnerDetails do not exist, create new OwnerDetails
      existingOwnerDetails = new this.ownerDetailsModel(ownerData);
      await existingOwnerDetails.save();

      // Save the relations if they exist in the DTO
      if (ownerData.Relations && ownerData.Relations.length > 0) {
        const relationDocs = ownerData.Relations.map(relation => ({
          ...relation,
          OwnerCivilIdNumber: ownerData.OwnerCivilIdNumber,
        }));
        await this.ownerRelationsModel.insertMany(relationDocs);
      }
    } else {
      existingOwnerDetails.Notes = ownerData.Notes;
      existingOwnerDetails.OwnerFullName = ownerData.OwnerFullName;
      existingOwnerDetails.OwnerOccupation = ownerData.OwnerOccupation;
      // If OwnerDetails exist, check and update the relations
      if (ownerData.Relations && ownerData.Relations.length > 0) {
        for (const newRelation of ownerData.Relations) {
          const existingRelation = await this.ownerRelationsModel.findOne({
            OwnerCivilIdNumber: ownerData.OwnerCivilIdNumber,
            RelatedCivilIdNumber: newRelation.RelatedCivilIdNumber,
          });

          if (existingRelation) {
            // Update the existing relation
            existingRelation.Notes = newRelation.Notes;
            await existingRelation.save();
          } else {
            // Add new relation
            const relationDoc = new this.ownerRelationsModel({
              ...newRelation,
              OwnerCivilIdNumber: ownerData.OwnerCivilIdNumber,
            });
            await relationDoc.save();

            // Update the relations reference in OwnerDetails
            // existingOwnerDetails.Relations.push(relationDoc._id);
          }
        }

        await existingOwnerDetails.save();
      }
    }

    return existingOwnerDetails;
  }

  async getOwnerDetails(ownerCivilIdNumber: string): Promise<any> {
    try {
        const ownerRelations = await this.ownerRelationsModel.find({ OwnerCivilIdNumber: ownerCivilIdNumber }).exec();
        //const ownerDetails = await this.ownerDetailsModel.findOne({ OwnerCivilIdNumber: ownerCivilIdNumber }).exec();

        return {  ownerRelations };
    } catch (error) {
        console.error("Error fetching owner details:", error);
        throw error;
    }
}





  async saveOwnerDetails(
    ownerData: OwnerDetailsDTO,
  ): Promise<OwnerDetails> {
    console.log(ownerData)
    const createdMinistryOffice = new this.ownerDetailsModel(ownerData).save()
    return await createdMinistryOffice
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



  async findbyNoteCivilId(civilId: string, page: number, limit: number): Promise<{
    data: OwnerDetails[],
    totalItems: number,
    currentpage: number,
    totalpages: number
  }> {
    const totalCount = await this.ownerDetailsModel.countDocuments({
      civilIdNumber: civilId
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
      totalpages: totalPages,
      totalItems: totalCount,
      data: results,
    };
  }

  async findbyAllNotes(page: number, limit: number): Promise<{
    data: OwnerDetails[],
    totalItems: number,
    currentpage: number,
    totalpages: number
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
      totalpages: totalPages,
      totalItems: totalCount,
      data: results,
    };
  }

}
