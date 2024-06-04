import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
  Query
} from '@nestjs/common';
import { MinistryOfficeService } from './minister_office.service';
import { CreateMinistryOfficeDto } from './dto/create-minister_office.dto';
import { MinistryOffice } from 'src/schemas/minister_office.schema';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller('minister-office')
export class MinistryOfficeController {
  constructor(private readonly ministryOfficeService: MinistryOfficeService) {}

  @Post('register')
  async createMinisterUser(
    @Body() createMinistryOfficeDto: CreateMinistryOfficeDto,
    @Res() res: FastifyReply,
  ): Promise<MinistryOffice> {
    try {
      const record = this.ministryOfficeService.createMinisterUser(
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

  @Get('findall/:civilId')
  async getAllNotesByCivilID(
    @Param('civilId') civilId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Res() res: FastifyReply) {
    try {
      const {currentpage,totalpages,
        totalItems, data } = await this.ministryOfficeService.findbyNoteCivilId(civilId,page, limit);
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

@Get('findall')
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
