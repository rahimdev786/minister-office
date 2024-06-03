import { PartialType } from '@nestjs/mapped-types';
import { CreateMinistryOfficeDto } from './create-ministry_office.dto';

export class UpdateMinistryOfficeDto extends PartialType(CreateMinistryOfficeDto) {}
