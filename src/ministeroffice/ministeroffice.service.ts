import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OwnerDetailsDTO } from './dto/minsteroffice.dto';
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
      existingOwnerDetails.NominatingParty = ownerData.NominatingParty;
      existingOwnerDetails.Nominator = ownerData.Nominator;
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

  async getOwnerDetails(param?: FilterHistory): Promise<any> {
    const query: any = {};
    try {
      if (param.ownerCivilIdNumber) {
        query.OwnerCivilIdNumber = param.ownerCivilIdNumber;
      }

      // Add date range criteria if startDate and endDate are provided
      if (param.startDate && param.endDate) {
        param.startDate = new Date(param.startDate);
        param.endDate = new Date(param.endDate);
        query.updatedAt = { $gte: param.startDate, $lte: param.endDate };
      } else if (param.startDate) {
        param.startDate = new Date(param.startDate);
        query.updatedAt = { $gte: param.startDate };
      } else if (param.endDate) {
        param.endDate = new Date(param.endDate);
        query.updatedAt = { $lte: param.endDate };
      }
      console.log('query data', query);

      const fetchData = await this.ownerDetailsModel
        .find(query)
        .sort({ updatedAt: -1 })
        .select('-_id -__v')
        .lean()
        .exec();

      const fetchDataWithRelations = await Promise.all(
        fetchData.map(async (details) => {
          const getChildDetails = await this.ownerRelationsModel
            .find({
              OwnerCivilIdNumber: details.OwnerCivilIdNumber,
            })
            .sort({ updatedAt: -1 })
            .lean()
            .exec();
          details.Relations = getChildDetails;
          return details;
        }),
      );

      console.log(fetchDataWithRelations);
      return fetchDataWithRelations;
    } catch (error) {
      throw new NotFoundException(
        'Failed to fetch data with owner id: ' + param.ownerCivilIdNumber,
      );
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

export interface FilterHistory {
  ownerCivilIdNumber: string;
  startDate: Date;
  endDate: Date;
}
