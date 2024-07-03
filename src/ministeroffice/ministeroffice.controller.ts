import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpStatus,
  NotFoundException,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { FilterHistory, MinistryOfficeService } from './ministeroffice.service';

import { OwnerDetails } from 'src/schemas/ministeroffice.schema';
import { FastifyReply } from 'fastify';
import { OwnerDetailsDTO } from './dto/minsteroffice.dto';
import { DepartmentService, FilterDepartment } from './department.service';
import { CreateDepartmentDto } from './dto/department.dto';
@Controller('MinisterOffice')
export class MinistryOfficeController {
  constructor(
    private readonly ministryOfficeService: MinistryOfficeService,
    private readonly departmentService: DepartmentService,
  ) {}

  @Post('CreateNote')
  async createMinisterUser(
    @Body() createMinistryOfficeDto: OwnerDetailsDTO,
    @Res() res: FastifyReply,
  ): Promise<OwnerDetails> {
    try {
      const record = this.ministryOfficeService.saveOwnerDetails2(
        createMinistryOfficeDto,
      );
      if (!record) {
        return res.send({
          status: HttpStatus.NOT_ACCEPTABLE,
          message: 'note has not been created',
        });
      }
      return res.send({
        status: HttpStatus.CREATED,
        message: 'note has been created',
      });
    } catch (error) {
      return res.send({
        status: HttpStatus.BAD_REQUEST,
        message: 'Failed to create notes details',
      });
    }
  }

  @Get('getOwnerDetails')
  async getOwnerDetails(
    @Query() queryData?: FilterHistory,
    @Res() res?: FastifyReply,
  ): Promise<OwnerDetails> {
    try {
      const ownerDetails =
        await this.ministryOfficeService.getOwnerDetails(queryData);
      return res.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        data: ownerDetails,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  @Post('CreateReport')
  async create(
    @Body() createDto: CreateDepartmentDto,
    @Res() res: FastifyReply,
  ) {
    try {
      const result = await this.departmentService.create(createDto);
      return res.send({
        status: HttpStatus.CREATED,
        message: result.message,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  @Get('ReportHistory')
  async histiry(@Query() params: FilterDepartment, @Res() res: FastifyReply) {
    try {
      const result = await this.departmentService.getHistory(params);
      return res.send({
        status: HttpStatus.OK,
        data: result,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  // @Delete('deleteOwnerDetails/:ownerCivilIdNumber')
  // async deleteOwnerDetails(
  //   @Param('ownerCivilIdNumber') ownerCivilIdNumber: string,
  //   @Res() res: FastifyReply,
  // ): Promise<void> {
  //   try {
  //     const result = await this.ministryOfficeService.deleteOwnerDetails(ownerCivilIdNumber);
  //     if (!result) {
  //       return res.status(HttpStatus.NOT_FOUND).send({
  //         status: HttpStatus.NOT_FOUND,
  //         message: 'Owner details not found',
  //       });
  //     }
  //     return res.status(HttpStatus.OK).send({
  //       status: HttpStatus.OK,
  //       message: 'Owner details deleted successfully',
  //     });
  //   } catch (error) {
  //     return res.status(HttpStatus.BAD_REQUEST).send({
  //       status: HttpStatus.BAD_REQUEST,
  //       message: 'Failed to delete owner details',
  //     });
  //   }
  // }

  // @Delete('deleteRelation/:ownerCivilIdNumber/:relationCivilIdNumber')
  // async deleteRelation(
  //   @Param('ownerCivilIdNumber') ownerCivilIdNumber: string,
  //   @Param('relationCivilIdNumber') relationCivilIdNumber: string,
  //   @Res() res: FastifyReply,
  // ): Promise<void> {
  //   try {
  //     const result = await this.ministryOfficeService.deleteRelation(ownerCivilIdNumber, relationCivilIdNumber);
  //     if (!result) {
  //       return res.status(HttpStatus.NOT_FOUND).send({
  //         status: HttpStatus.NOT_FOUND,
  //         message: 'Relation not found',
  //       });
  //     }
  //     return res.status(HttpStatus.OK).send({
  //       status: HttpStatus.OK,
  //       message: 'Relation deleted successfully',
  //     });
  //   } catch (error) {
  //     return res.status(HttpStatus.BAD_REQUEST).send({
  //       status: HttpStatus.BAD_REQUEST,
  //       message: 'Failed to delete relation',
  //     });
  //   }
  // }
}
