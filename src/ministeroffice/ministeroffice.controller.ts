import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
  Query,
  Put
} from '@nestjs/common';
import { MinistryOfficeService } from './ministeroffice.service';
import { OwnerDetailsDTO, OwnerRelationsDTO } from './dto/createMinisteroffice.dto';
import { OwnerDetails } from 'src/schemas/ministeroffice.schema';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller('MinisterOffice')
export class MinistryOfficeController {
  constructor(private readonly ministryOfficeService: MinistryOfficeService) {}

  @Post('Register')
  async createMinisterUser(
    @Body() createMinistryOfficeDto: OwnerDetailsDTO,
    @Res() res: FastifyReply,
  ): Promise<OwnerDetails> {
    try {
      const record = this.ministryOfficeService.saveOwnerDetails(
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

@Post('AddRelatons/:ownerCivilIdNumber')
 async addRelation(
    @Param('ownerCivilIdNumber') ownerCivilIdNumber: string,
    @Body() updateRelationDto: OwnerRelationsDTO,
    @Res() res: FastifyReply
) {
    await this.ministryOfficeService.addRelation(ownerCivilIdNumber, updateRelationDto).then(val => {
       if (val === null) {
         return  res.send({
          status: HttpStatus.NOT_FOUND,
           data: val,
           message:"we can not add relation note for civilId because this is not use before" + ownerCivilIdNumber
        })
       }
       return res.send({
         status: HttpStatus.OK,
         data:val
        })
    })

}

  @Put('UpdateOwnerRelation/:ownerCivilIdNumber/:relatedId')
   async updateOwnerRelations(
      @Param('ownerCivilIdNumber') ownerCivilIdNumber: string,
       @Param('relatedId') relatedId: string,
      @Body() ownerRelationDto: OwnerRelationsDTO,
      @Res() res: FastifyReply
  ) {
    await this.ministryOfficeService.updateRelation(ownerCivilIdNumber, relatedId, ownerRelationDto).then((val => {
      if (val === null) {
      console.log('ownwer details not avalable')
      return res.send({
          status: HttpStatus.NOT_FOUND,
           data: val,
           message:"owner detaits are not avaliable " + ownerCivilIdNumber
        })
      }
      return res.send({
         status: HttpStatus.OK,
         data:val
        })
    }))
  }

  @Put('UpdateOwner/:ownerCivilIdNumber')
  async updateOwner(
    @Param('ownerCivilIdNumber') ownerCivilIdNumber: string,
    @Body() updateUserDto: OwnerDetailsDTO,
    @Res() res: FastifyReply
  ) {
    await this.ministryOfficeService.updateOwner(ownerCivilIdNumber, updateUserDto).then((val)=>{
       if (val === null) {
      console.log('ownwer details not avalable')
      return res.send({
          status: HttpStatus.NOT_FOUND,
           data: val,
           message:"owner detaits are not avaliable " + ownerCivilIdNumber
        })
      }
      return res.send({
         status: HttpStatus.OK,
         data:val
        })
    })
  }

  @Get('FindAll/:civilId')
  async getAllNotesByCivilID(
    @Param('civilId') civilId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Res() res: FastifyReply) {
    try {
      const {currentpage,totalpages,
        totalItems, data } = await this.ministryOfficeService.findbyNoteCivilId(civilId, page, limit);
      if (currentpage > totalpages) {
        return res.send({
          data:data,
          status:400,
          message: 'no data avaiable on this page'
        });
      } 
      if (data.length === 0) {
        return res.send({
          data:data,
          status: HttpStatus.NOT_FOUND,
          message: 'data not found with page = ' +currentpage+ ' on ' + civilId,
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

@Get('FindAll')
async getAllNotes(
  @Query('page') page: number = 1,
  @Query('limit') limit: number = 10,
  @Res() res: FastifyReply) {
    try {
      const {currentpage,totalpages,
        totalItems, data } = await this.ministryOfficeService.findbyAllNotes(page, limit);
      if (currentpage > totalpages) {
        return res.send({
          data:data,
          status:400,
          message: 'no data avaiable on this page ' + currentpage
        });
      } 
      if (data.length === 0) {
        return res.send({
          data:data,
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
          status:500,
          message: 'Internal server error'
        }
      );
    }
  }
}
