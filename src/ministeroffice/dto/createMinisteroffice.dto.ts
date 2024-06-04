// dto/create-ministry-office.dto.ts
import { Type } from 'class-transformer';
import {
  IsArray,
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
  @IsNotEmpty()
  UserName: string;

  @IsString()
  @IsOptional()
  UserId?: string;

  @IsNumberString()
  @IsNotEmpty()
  @Length(12, 12)
  OwnerCivilIdNumber: string;

  @IsString()
  @IsNotEmpty()
  Notes: string;

  @IsString()
  @IsNotEmpty()
  OwnerFullName: string;

  @ValidateNested({ each: true })
  @Type(() => OwnerRelationsDTO)
  Relations: OwnerRelationsDTO[];
}

export class OwnerRelationsDTO {
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
  @IsNotEmpty()
  RelatedWithOwner: string;
}


