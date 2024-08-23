import { IsString } from 'class-validator';

export class ParsePaperDto {
  @IsString()
  pubmedId: string;
}
