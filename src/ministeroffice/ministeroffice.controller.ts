import { Controller, Get, Post, Body, Param, Res, HttpStatus, Delete } from '@nestjs/common';
import { MinistryOfficeService } from './ministeroffice.service';
import { OwnerDetailsDTO } from './dto/createMinisteroffice.dto';
import { OwnerDetails } from 'src/schemas/ministeroffice.schema';
import { FastifyReply } from 'fastify';

@Controller('MinisterOffice')
export class MinistryOfficeController {
  constructor(private readonly ministryOfficeService: MinistryOfficeService) { }

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

  @Get('getOwnerDetails/:ownerCivilIdNumber')
  async getOwnerDetails(
    @Param('ownerCivilIdNumber') ownerCivilIdNumber: string,
    @Res() res: FastifyReply,
  ): Promise<OwnerDetails> {
    try {
      const ownerDetails = await this.ministryOfficeService.getOwnerDetails(ownerCivilIdNumber);
      console.log(ownerDetails)
      if (!ownerDetails) {
        return res.status(HttpStatus.NOT_FOUND).send({
          status: HttpStatus.NOT_FOUND,
          message: 'Owner details not found',
        });
      }
       

     

      return res.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        data: ownerDetails,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: 'Failed to fetch owner details',
      });
    }
  }

  @Delete('deleteOwnerDetails/:ownerCivilIdNumber')
  async deleteOwnerDetails(
    @Param('ownerCivilIdNumber') ownerCivilIdNumber: string,
    @Res() res: FastifyReply,
  ): Promise<void> {
    try {
      const result = await this.ministryOfficeService.deleteOwnerDetails(ownerCivilIdNumber);
      if (!result) {
        return res.status(HttpStatus.NOT_FOUND).send({
          status: HttpStatus.NOT_FOUND,
          message: 'Owner details not found',
        });
      }
      return res.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: 'Owner details deleted successfully',
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: 'Failed to delete owner details',
      });
    }
  }

  @Delete('deleteRelation/:ownerCivilIdNumber/:relationCivilIdNumber')
  async deleteRelation(
    @Param('ownerCivilIdNumber') ownerCivilIdNumber: string,
    @Param('relationCivilIdNumber') relationCivilIdNumber: string,
    @Res() res: FastifyReply,
  ): Promise<void> {
    try {
      const result = await this.ministryOfficeService.deleteRelation(ownerCivilIdNumber, relationCivilIdNumber);
      if (!result) {
        return res.status(HttpStatus.NOT_FOUND).send({
          status: HttpStatus.NOT_FOUND,
          message: 'Relation not found',
        });
      }
      return res.status(HttpStatus.OK).send({
        status: HttpStatus.OK,
        message: 'Relation deleted successfully',
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: 'Failed to delete relation',
      });
    }
  }
}
