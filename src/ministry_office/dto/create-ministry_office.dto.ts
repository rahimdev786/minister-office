// dto/create-ministry-office.dto.ts
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MAX,
  Min,
  min,
} from 'class-validator';

export class CreateMinistryOfficeDto {
  @IsString()
  @IsNotEmpty()
  UserName: string;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(5)
  @Max(12)
  civilIdNumber: number;

  @IsString()
  @IsNotEmpty()
  notes: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;
}
