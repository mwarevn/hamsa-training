import { NotePriority } from 'src/modules/note/enums/note-priority.enum';
import { NoteStatus } from 'src/modules/note/enums/note-status.enum';

export interface INoteResponse {
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date: string;
  tags: string[];
}

export interface QueryFilter {
  status: NoteStatus;
  priority: NotePriority;
  tags: string;
  assigned: boolean;
}
