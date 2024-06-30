import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/department.dto';
import { Department } from 'src/schemas/department.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name)
    private departmentModel: Model<Department>,
  ) {}

  async create(createDto: CreateDepartmentDto) {
    let existingDepartment = await this.departmentModel.findOne({
      civilIdNumber: createDto.civilIdNumber,
    });
    if (existingDepartment) {
      existingDepartment = await this.departmentModel.findOneAndUpdate(
        { civilIdNumber: createDto.civilIdNumber },
        {
          $set: {
            status: createDto.status,
            report: createDto.report,
            department: createDto.department,
            reportedUserId: createDto.reportedUserId,
            reportedUserName: createDto.reportedUserName,
          },
        },
        { upsert: true, new: true },
      );
      return {
        //existingDepartment,
        message: 'updated sucessful',
      };
    } else {
      const data = await this.departmentModel.create(createDto);
      return {
        data: data,
        message: 'sucessful created',
      };
    }
  }

  async getHistory(param: FilterDepartment) {
    try {
      let query: any = {};

      if (param.civilIdNumber) {
        query.OwnerCivilIdNumber = param.civilIdNumber;
      }

      if (param.department) {
        query.department = param.department;
      }

      if (param.status) {
        query.status = param.status;
      }

      if (param.startDate && param.endDate) {
        const startDate = new Date(param.startDate);
        const endDate = new Date(param.endDate);
        query.updatedAt = { $gte: startDate, $lte: endDate };
      } else if (param.startDate) {
        const startDate = new Date(param.startDate);
        query.updatedAt = { $gte: startDate };
      } else if (param.endDate) {
        const endDate = new Date(param.endDate);
        query.updatedAt = { $lte: endDate };
      }

      console.log('Query Details:', query);

      const fetchData = await this.departmentModel
        .find(query)
        .sort({ updatedAt: -1 })
        .select('-_id -__v')
        .lean()
        .exec();

      if (fetchData.length === 0) {
        throw new NotFoundException('No data available');
      }
      console.log(fetchData);
      return fetchData;
    } catch (error) {
      throw new NotFoundException('Failed to retrieve data');
    }
  }
}

export interface FilterDepartment {
  civilIdNumber?: string;
  department?: string;
  status?: string;
  startDate?: Date;
  endDate?: Date;
}
