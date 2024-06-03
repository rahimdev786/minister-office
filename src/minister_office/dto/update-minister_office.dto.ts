import { PartialType } from '@nestjs/mapped-types';
import { CreateMinistryOfficeDto } from './create-minister_office.dto';

export class UpdateMinistryOfficeDto extends PartialType(
  CreateMinistryOfficeDto,
) {}
