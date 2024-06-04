// ministry-offices/schemas/ministry-office.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class OwnerDetails extends Document {
  @Prop({ required: true })
  UserId: string;

  @Prop({ required: true })
  UserName: string;

  @Prop({ required: true })
  OwnerCivilIdNumber: string;

  @Prop({ required: true })
  Notes: string;

  @Prop({ required: true })
  OwnerFullName: string;

  @Prop({ type: [{ type: Object, ref: 'OwnerRelations' }] })
  @Type(() => OwnerRelations)
  RELATION?: OwnerRelations[];
}


@Schema({ timestamps: true })
export class OwnerRelations extends Document {

  @Prop({ required: true })
  OwnerCivilIdNumber: string
  
  @Prop({ required: true })
  Notes: string;

   @Prop({ required: true })
   RelatedCivilIdNumber: string

   @Prop({ required: true })
   RelatedWithOwner: string
}

export const OwnerDetailsSchema =
  SchemaFactory.createForClass(OwnerDetails);
  export const OwnerRelationDetailsSchema =
  SchemaFactory.createForClass(OwnerRelations);

