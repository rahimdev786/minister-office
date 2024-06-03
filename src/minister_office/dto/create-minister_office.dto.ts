// dto/create-ministry-office.dto.ts
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateMinistryOfficeDto {
  @IsString()
  @IsNotEmpty()
  UserName: string;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsNumberString()
  @IsNotEmpty()
  @Length(12, 12)
  civilIdNumber: string;

  @IsString()
  @IsNotEmpty()
  notes: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;
}
