import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { MinistryOfficeService } from './minister_office.service';
import { CreateMinistryOfficeDto } from './dto/create-minister_office.dto';
import { MinistryOffice } from 'src/schemas/minister_office.schema';
import { FastifyReply } from 'fastify';

@Controller('minister_office')
export class MinistryOfficeController {
  constructor(private readonly ministryOfficeService: MinistryOfficeService) {}

  @Post()
  async createMinistryUser(
    @Body() createMinistryOfficeDto: CreateMinistryOfficeDto,
    @Res() res: FastifyReply,
  ): Promise<MinistryOffice> {
    try {
      const record = this.ministryOfficeService.createMinistryUser(
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

  @Get('find_all/:civilId')
  async findOneNoteByCivilID(@Param('civilId') civilId: string, @Res() res: FastifyReply) {
    try {
      const result = await this.ministryOfficeService.findbyNoteCivilId(civilId);
      if (result.length === 0) {
        return res.send({
          status: HttpStatus.NOT_FOUND,
          message: 'data not found with' + civilId,
        });
      }
      return res.send({
        data: result,
      });
    } catch (error) {
      return res.send({
        status: HttpStatus.BAD_REQUEST,
        message: 'Failed to retrive data',
      });
    }
  }

   @Get('find_all')
  async findAllNotes(@Res() res: FastifyReply) {
    try {
      const result = await this.ministryOfficeService.findbyAllNotes();
      if (result.length === 0) {
        return res.send({
          status: HttpStatus.NOT_FOUND,
          message: 'data not found',
        });
      }
      return res.send({
        data: result,
      });
    } catch (error) {
      return res.send({
        status: HttpStatus.BAD_REQUEST,
        message: 'Failed to retrive data',
      });
    }
  }
}
