// dto/create-ministry-office.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMinistryOfficeDto {
  @IsString()
  @IsNotEmpty()
  UserName: string;

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
