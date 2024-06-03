// dto/create-ministry-office.dto.ts
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMinistryOfficeDto {
  @IsString()
  @IsNotEmpty()
  UserName: string;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsNumber()
  @IsNotEmpty()
  civilIdNumber: number;

  @IsString()
  @IsNotEmpty()
  notes: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;
}
