import { PartialType } from '@nestjs/mapped-types';
import { OwnerDetailsDTO } from './createMinisteroffice.dto';

export class UpdateMinistryOfficeDto extends PartialType(
  OwnerDetailsDTO
) {}
