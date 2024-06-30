import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Department extends Document {
  @Prop()
  requestedUserId: string;

  @Prop()
  requestedUserName: string;

  @Prop()
  civilIdNumber: string;

  @Prop()
  fullName: string;

  @Prop()
  status?: string;

  @Prop()
  report?: string;

  @Prop()
  department?: string;

  @Prop()
  reportedUserId?: string;

  @Prop()
  reportedUserName?: string;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
