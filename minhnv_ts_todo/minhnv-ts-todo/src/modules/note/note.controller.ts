import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateNoteDTO } from 'src/modules/note/dto/create-note.dto';
import { UpdateNoteDTO } from 'src/modules/note/dto/update-note.dto';
import { NoteService } from 'src/modules/note/note.service';
import { INoteResponse, QueryFilter } from 'src/modules/note/types/note.type';

@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Post()
  async createNote(
    @Body() createNoteDTO: CreateNoteDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const currentUserId: string = req.cookies._id;
    const createdNote = await this.noteService.createNote(
      createNoteDTO,
      currentUserId,
    );

    if (!createdNote) {
      throw new ServiceUnavailableException();
    }

    res.status(201).json({ success: true, data: createdNote });
  }

  @Put('/:id') // update task by id
  async updateNoteById(
    @Body() updateNoteDto: UpdateNoteDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const id = req.params.id;

    const updatedNote: INoteResponse = await this.noteService.updateNoteById(
      updateNoteDto,
      id,
    );

    if (!updatedNote) {
      throw new NotFoundException();
    }

    res.json({ success: true, data: updatedNote });
  }

  @Get('/:id')
  async getNoteById(@Req() req: Request, @Res() res: Response) {
    const id = req.params.id;

    const existsNote: INoteResponse = await this.noteService.getNoteById(id);

    if (!existsNote) {
      throw new NotFoundException();
    }

    res.json({ success: true, data: existsNote });
  }

  @Get()
  async getNoteByQueryFilter(
    @Query() query: QueryFilter,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const id = req.cookies._id;

    const notes: INoteResponse[] = await this.noteService.getNoteByQueryFilter(
      query,
      id,
    );

    if (!notes) {
      throw new NotFoundException();
    }

    res.json({ success: true, data: notes });
  }

  @Delete('/:id') // delete note by id
  async deleteNoteById(@Param('id') id: string, @Res() res: Response) {
    const deletedNote: INoteResponse =
      await this.noteService.deleteNoteById(id);

    if (!deletedNote) {
      throw new NotFoundException();
    }

    res.json({ success: true, message: 'Deleted' });
  }
}
