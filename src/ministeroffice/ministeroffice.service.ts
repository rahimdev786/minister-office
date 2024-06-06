import { ConflictException, Injectable } from '@nestjs/common';
import {
  OwnerDetailsDTO,
  OwnerRelationsDTO,
} from './dto/createMinisteroffice.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  OwnerDetails,
  OwnerRelations,
} from 'src/schemas/ministeroffice.schema';
import { Model } from 'mongoose';

@Injectable()
export class MinistryOfficeService {
  constructor(
    @InjectModel(OwnerDetails.name)
    private ownerDetailsModel: Model<OwnerDetails>,
    @InjectModel(OwnerRelations.name)
    private ownerRelationsModel: Model<OwnerRelations>,
  ) {}

  async saveOwnerDetails2(ownerData: OwnerDetailsDTO): Promise<OwnerDetails> {
    let existingOwnerDetails = await this.ownerDetailsModel.findOne({
      OwnerCivilIdNumber: ownerData.OwnerCivilIdNumber,
    });
    if (!existingOwnerDetails) {
      const { Relations, ...ownerDetailsData } = ownerData;
      existingOwnerDetails = new this.ownerDetailsModel(ownerDetailsData);
      await existingOwnerDetails.save();
      if (ownerData.Relations && ownerData.Relations.length > 0) {
        const relationDocs = ownerData.Relations.map((relation) => ({
          ...relation,
          OwnerCivilIdNumber: ownerData.OwnerCivilIdNumber,
        }));
        await this.ownerRelationsModel.insertMany(relationDocs);
      }
    } else {
      existingOwnerDetails.Notes = ownerData.Notes;
      existingOwnerDetails.OwnerFullName = ownerData.OwnerFullName;
      existingOwnerDetails.OwnerOccupation = ownerData.OwnerOccupation;
      existingOwnerDetails.IsActive = ownerData.IsActive;
      existingOwnerDetails.UserName = ownerData.UserName;
      existingOwnerDetails.UserId = ownerData.UserId;
      if (ownerData.Relations && ownerData.Relations.length > 0) {
        for (const newRelation of ownerData.Relations) {
          const existingRelation = await this.ownerRelationsModel.findOne({
            OwnerCivilIdNumber: ownerData.OwnerCivilIdNumber,
            RelatedCivilIdNumber: newRelation.RelatedCivilIdNumber,
          });
          if (existingRelation) {
            existingRelation.Notes = newRelation.Notes;
            existingRelation.IsActive = newRelation.IsActive;
            existingRelation.UserId = newRelation.UserId;
            existingRelation.UserName = newRelation.UserName;
            await existingRelation.save();
          } else {
            const relationDoc = new this.ownerRelationsModel({
              ...newRelation,
              OwnerCivilIdNumber: ownerData.OwnerCivilIdNumber,
            });
            await relationDoc.save();
          }
        }
      }
      await existingOwnerDetails.save();
    }

    return existingOwnerDetails;
  }

  async getOwnerDetails(ownerCivilIdNumber: string): Promise<any> {
    try {
      const fetchData = await this.ownerDetailsModel
        .findOne({ OwnerCivilIdNumber: ownerCivilIdNumber })
        .select('-_id -__v')
        .lean()
        .exec();
      console.log('fetchData', fetchData);
      if (fetchData === null) {
        // owner data not avaliable
        return {};
      } else {
        // owner data avaliable
        const { Relations, ...ownerDetails } = fetchData;
        const ownerRelations = await this.ownerRelationsModel
          .find({ OwnerCivilIdNumber: ownerCivilIdNumber })
          .select('-_id -__v')
          .lean()
          .exec();
        if (Relations.length === 0 && ownerRelations.length === 0) {
          return { ownerDetails };
        } else {
          return { ownerDetails, ownerRelations };
        }
      }
    } catch (error) {
      console.error('Error fetching owner details:', error);
      throw error;
    }
  }

  async deleteOwnerDetails(ownerCivilIdNumber: string): Promise<boolean> {
    try {
      const ownerDetailsDeletion = await this.ownerDetailsModel.deleteOne({
        OwnerCivilIdNumber: ownerCivilIdNumber,
      });
      if (ownerDetailsDeletion.deletedCount === 0) {
        return false;
      }
      await this.ownerRelationsModel.deleteMany({
        OwnerCivilIdNumber: ownerCivilIdNumber,
      });
      return true;
    } catch (error) {
      console.error('Error deleting owner details:', error);
      throw error;
    }
  }

  async deleteRelation(
    ownerCivilIdNumber: string,
    relationCivilIdNumber: string,
  ): Promise<boolean> {
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
      console.error('Error deleting relation:', error);
      throw error;
    }
  }
}
