import { IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(256)
  login: string;

  @IsString()
  @MaxLength(256)
  password: string;
}
