import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AddUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(6)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(6)
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(6)
  readonly password: string;
}
