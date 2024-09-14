import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { NotePriority } from 'src/modules/note/enums/note-priority.enum';
import { NoteStatus } from 'src/modules/note/enums/note-status.enum';

export type NoteDocument = HydratedDocument<Note>;

@Schema({ timestamps: true })
export class Note extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ enum: NoteStatus, default: NoteStatus.Pending })
  status: NoteStatus;

  @Prop({ enum: NotePriority, default: NotePriority.Low })
  priority: NotePriority;

  @Prop()
  due_date: string;

  @Prop()
  completed_at: string;

  @Prop()
  assigned_to: mongoose.Schema.Types.ObjectId;

  @Prop()
  tags: string[];
}

export const NoteSchema = SchemaFactory.createForClass(Note);
