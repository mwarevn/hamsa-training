import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNoteDTO } from 'src/modules/note/dto/create-note.dto';
import { UpdateNoteDTO } from 'src/modules/note/dto/update-note.dto';
import { Note, NoteDocument } from 'src/modules/note/schemas/note.schema';
import { QueryFilter } from 'src/modules/note/types/note.type';

@Injectable()
export class NoteService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async createNote(createNoteDTO: CreateNoteDTO, _id: string) {
    try {
      if (!createNoteDTO.assigned_to) {
        createNoteDTO.assigned_to = _id;
      }
      const createdNote = await this.noteModel.create(createNoteDTO);
      return createdNote;
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException();
    }
  }

  async updateNoteById(updateNoteDto: UpdateNoteDTO, id: string) {
    try {
      const existsNote = await this.noteModel.findByIdAndUpdate(
        id,
        updateNoteDto,
        { new: true },
      );

      if (!existsNote) {
        return null;
      }

      return existsNote.toObject();
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException();
    }
  }

  async getNoteById(id: string) {
    try {
      const existsNote = await this.noteModel.findById(id);

      if (existsNote) {
        return existsNote.toObject();
      }
      return null;
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException();
    }
  }

  async getAllNotesByAssigned(id: string) {
    try {
      return (await this.noteModel.find({ assigned_to: id })).map((e) =>
        e.toObject(),
      );
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException();
    }
  }

  async getNoteByQueryFilter(query: QueryFilter, id: string) {
    const conditions = {};

    if (query.priority) {
      conditions['priority'] = query.priority;
    }

    if (query.status) {
      conditions['status'] = query.status;
    }

    if (query.tags) {
      conditions['tags'] = { $in: query.tags.split(',') };
    }

    if (query.assigned) {
      conditions['assigned_to'] = id;
    }

    try {
      return (await this.noteModel.find(conditions)).map((e) => e.toObject());
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException();
    }
  }

  async deleteNoteById(id: string) {
    try {
      return (await this.noteModel.findByIdAndDelete(id)).toObject();
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException();
    }
  }
}
