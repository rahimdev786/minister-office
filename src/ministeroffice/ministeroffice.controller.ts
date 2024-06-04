import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
  Query,
  Put,
  Delete
} from '@nestjs/common';
import { MinistryOfficeService } from './ministeroffice.service';
import { OwnerDetailsDTO, OwnerRelationsDTO } from './dto/createMinisteroffice.dto';
import { OwnerDetails } from 'src/schemas/ministeroffice.schema';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller('MinisterOffice')
export class MinistryOfficeController {
  constructor(private readonly ministryOfficeService: MinistryOfficeService) { }

  @Post('Register')
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



  @Post(':ownerCivilIdNumber/addRelation')
  addRelation(
    @Param('ownerCivilIdNumber') ownerCivilIdNumber: string,
    @Body() updateRelationDto: OwnerRelationsDTO,
  ) {

    console.log(ownerCivilIdNumber)
    return this.ministryOfficeService.addRelation(ownerCivilIdNumber, updateRelationDto);
  }


  @Put(':ownerCivilIdNumber')
  updateUser(
    @Param('ownerCivilIdNumber') ownerCivilIdNumber: string,
    @Body() updateUserDto: OwnerDetailsDTO,
  ) {
    return this.ministryOfficeService.updateOwner(ownerCivilIdNumber, updateUserDto);
  }

  @Get('getOwnerDetails/:ownerCivilIdNumber')
  async getOwnerDetails(
    @Param('ownerCivilIdNumber') ownerCivilIdNumber: string,
    @Res() res: FastifyReply,
  ): Promise<OwnerDetails> {
    try {
      const ownerDetails = await this.ministryOfficeService.getOwnerDetails(ownerCivilIdNumber);
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




  @Get('Findall/:civilId')
  async getAllNotesByCivilID(
    @Param('civilId') civilId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Res() res: FastifyReply) {
    try {
      const { currentpage, totalpages,
        totalItems, data } = await this.ministryOfficeService.findbyNoteCivilId(civilId, page, limit);
      if (currentpage > totalpages) {
        return res.send({
          data: data,
          status: 400,
          message: 'no data avaiable on this page'
        });
      }
      if (data.length === 0) {
        return res.send({
          data: data,
          status: HttpStatus.NOT_FOUND,
          message: 'data not found with page = ' + currentpage + ' on ' + civilId,
        });
      }
      return res.send({
        currentpage, totalpages,
        totalItems, data
      });
    } catch (error) {
      return res.send({
        status: HttpStatus.BAD_REQUEST,
        message: 'Failed to retrive data',
      });
    }
  }

  @Get('Findall')
  async getAllNotes(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Res() res: FastifyReply) {
    try {
      const { currentpage, totalpages,
        totalItems, data } = await this.ministryOfficeService.findbyAllNotes(page, limit);
      if (currentpage > totalpages) {
        return res.send({
          data: data,
          status: 400,
          message: 'no data avaiable on this page ' + currentpage
        });
      }
      if (data.length === 0) {
        return res.send({
          data: data,
          status: HttpStatus.NOT_FOUND,
          message: 'data not found',
        });
      }
      return res.send({
        currentpage, totalpages,
        totalItems, data
      });
    } catch (error) {
      res.send(
        {
          status: 500,
          message: 'Internal server error'
        }
      );
    }
  }
}
