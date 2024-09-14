import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, sparse: true })
  username: string;

  @Prop({ required: false })
  password: string;

  @Prop({})
  avatar?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
