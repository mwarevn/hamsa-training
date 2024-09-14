import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from 'src/modules/note/schemas/note.schema';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  controllers: [NoteController],
  providers: [NoteService],
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
    UserModule,
  ],
})
export class NoteModule {}
