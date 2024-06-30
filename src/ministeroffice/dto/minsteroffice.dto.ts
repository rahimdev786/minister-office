// dto/create-ministry-office.dto.ts
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

export class OwnerDetailsDTO {
  @IsString()
  @IsOptional()
  UserName?: string;

  @IsString()
  @IsOptional()
  UserId?: string;

  @IsNumberString()
  @IsNotEmpty()
  @Length(12, 12)
  OwnerCivilIdNumber: string;

  @IsString()
  @IsOptional()
  Notes: string;

  @IsString()
  @IsOptional()
  OwnerFullName: string;

  @IsString()
  @IsOptional()
  OwnerOccupation: string;

  @IsBoolean()
  @IsNotEmpty()
  IsActive: boolean;

  @IsString()
  @IsOptional()
  NominatingParty: string;

  @IsString()
  @IsOptional()
  Nominator: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OwnerRelationsDTO)
  Relations: OwnerRelationsDTO[];
}

export class OwnerRelationsDTO {
  @IsString()
  @IsOptional()
  UserName: string;

  @IsString()
  @IsOptional()
  UserId: string;

  @IsNumberString()
  @IsNotEmpty()
  @Length(12, 12)
  OwnerCivilIdNumber: string;

  @IsString()
  @IsOptional()
  Notes: string;

  @IsNumberString()
  @IsNotEmpty()
  @Length(12, 12)
  RelatedCivilIdNumber: string;

  @IsString()
  @IsOptional()
  RelatedWithOwner: string;

  @IsBoolean()
  @IsNotEmpty()
  IsActive: boolean;

  @IsString()
  @IsOptional()
  RelatedFullName: string;
}
