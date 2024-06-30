import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  NotFoundException,
  InternalServerErrorException,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { DepartmentService, FilterDepartment } from './department.service';
import { CreateDepartmentDto } from './dto/department.dto';
import { FastifyReply } from 'fastify';

@Controller('Department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post('create')
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

  @Get('history')
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
}
