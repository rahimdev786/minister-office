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
      const { Relations, ...ownerDetailsData } = ownerData;
      existingOwnerDetails = new this.ownerDetailsModel(ownerDetailsData);
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
      existingOwnerDetails.isActive = ownerData.isActive;
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
            existingRelation.isActive = newRelation.isActive;
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

      }
      await existingOwnerDetails.save();
    }

    return existingOwnerDetails;
  }

  async getOwnerDetails(ownerCivilIdNumber: string): Promise<any> {
    try {
      // Fetch data from both models
      const ownerRelations = await this.ownerRelationsModel.find({ OwnerCivilIdNumber: ownerCivilIdNumber }).select('-_id -__v').lean().exec();
      const {Relations,...ownerDetails} = await this.ownerDetailsModel.findOne({ OwnerCivilIdNumber: ownerCivilIdNumber }).select('-_id -__v').lean().exec();

      // Combine the results
     
      
    return {
      ownerDetails,
      ownerRelations,
    };
    } catch (error) {
      console.error("Error fetching owner details:", error);
      throw error;
    }
  }


  async deleteOwnerDetails(ownerCivilIdNumber: string): Promise<boolean> {
    try {
      // Delete owner details
      const ownerDetailsDeletion = await this.ownerDetailsModel.deleteOne({ OwnerCivilIdNumber: ownerCivilIdNumber });

      if (ownerDetailsDeletion.deletedCount === 0) {
        return false; // Owner details not found
      }

      // Delete related relations
      await this.ownerRelationsModel.deleteMany({ OwnerCivilIdNumber: ownerCivilIdNumber });

      return true;
    } catch (error) {
      console.error("Error deleting owner details:", error);
      throw error;
    }
  }


  async deleteRelation(ownerCivilIdNumber: string, relationCivilIdNumber: string): Promise<boolean> {
    try {
      const relationDeletion = await this.ownerRelationsModel.deleteOne({
        OwnerCivilIdNumber: ownerCivilIdNumber,
        RelatedCivilIdNumber: relationCivilIdNumber,
      });

      if (relationDeletion.deletedCount === 0) {
        return false; // Relation not found
      }

      return true;
    } catch (error) {
      console.error("Error deleting relation:", error);
      throw error;
    }
  }

}
