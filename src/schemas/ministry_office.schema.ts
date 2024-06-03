// ministry-offices/schemas/ministry-office.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class MinistryOffice extends Document {
  @Prop({ required: true })
  UserName: string;

  @Prop({ required: true })
  civilIdNumber: string;

  @Prop({ required: true })
  notes: string;

  @Prop()
  userId?: string;

  @Prop({ required: true })
  fullName: string;
}

export const MinistryOfficeSchema =
  SchemaFactory.createForClass(MinistryOffice);
