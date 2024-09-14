import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateNoteDTO {
  @IsOptional() readonly title: string;
  @IsOptional()
  readonly description: string;
  @IsOptional()
  readonly status: string;
  @IsOptional()
  readonly priority: string;
  @IsOptional()
  readonly due_date: string;
  @IsOptional()
  @IsNotEmpty()
  assigned_to: string;
  @IsOptional()
  readonly tags: string[];
}
