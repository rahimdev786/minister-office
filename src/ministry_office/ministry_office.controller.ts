import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MinistryOfficeService } from './ministry_office.service';
import { CreateMinistryOfficeDto } from './dto/create-ministry_office.dto';
import { UpdateMinistryOfficeDto } from './dto/update-ministry_office.dto';
import { MinistryOffice } from 'src/schemas/ministry_office.schema';
import { FastifyReply } from 'fastify';
import { error } from 'console';

@Controller('ministry_office')
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

  // @Get()
  // findAll() {
  //   return this.ministryOfficeService.findAll();
  // }

  @Get('find_all/:civilId')
  async findOne(@Param('civilId') civilId: string, @Res() res: FastifyReply) {
    try {
      const result = await this.ministryOfficeService.findbyCivilId(civilId);
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
        message: 'Failed to create notes details',
      });
    }
  }
}
