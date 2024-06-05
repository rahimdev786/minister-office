// ministry-offices/schemas/ministry-office.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class OwnerDetails extends Document {
  @Prop()
  UserId: string;

  @Prop()
  UserName: string;

  @Prop()
  OwnerCivilIdNumber: string;

  @Prop()
  Notes: string;

  @Prop()
  OwnerFullName: string;

  @Prop()
  OwnerOccupation: string;

  @Prop()
  IsActive: boolean;

  @Prop({ type: [{ type: Object, ref: 'OwnerRelations' }] })
  @Type(() => OwnerRelations)
  Relations: OwnerRelations[];
}

@Schema({ timestamps: true })
export class OwnerRelations extends Document {
  @Prop()
  OwnerCivilIdNumber: string;

  @Prop()
  Notes: string;

  @Prop()
  RelatedCivilIdNumber: string;

  @Prop()
  RelatedWithOwner: string;

  @Prop()
  RelatedFullName: string;

  @Prop()
  IsActive: boolean;

  @Prop()
  UserName: string;

  @Prop()
  UserId: string;
}

export const OwnerDetailsSchema = SchemaFactory.createForClass(OwnerDetails);
export const OwnerRelationDetailsSchema =
  SchemaFactory.createForClass(OwnerRelations);
