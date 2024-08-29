import { IsString } from 'class-validator';

export class ParseSinglePubmedPaperDto {
  @IsString()
  pubmedId: string;
}

export class ParseBulkPubmedPapersDto {
  @IsString()
  search: string;
}
