import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ index: true }) // Index for fast filtering by name
  name: string;

  @Prop({ unique: true, index: true }) // Unique index for email
  email: string;

  @Prop({ index: true }) // Index for phone search
  phone: string;

  @Prop()
  birthday: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
