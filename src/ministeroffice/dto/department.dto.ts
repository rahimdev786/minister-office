import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { OwnerRelations } from 'src/schemas/ministeroffice.schema';

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  requestedUserId: string;

  @IsString()
  @IsNotEmpty()
  requestedUserName: string;

  @IsNumberString()
  @IsNotEmpty()
  @Length(12, 12)
  civilIdNumber: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  report?: string;

  @IsString()
  @IsOptional()
  department?: string;

  @IsString()
  @IsOptional()
  reportedUserId?: string;

  @IsString()
  @IsOptional()
  reportedUserName?: string;
}
