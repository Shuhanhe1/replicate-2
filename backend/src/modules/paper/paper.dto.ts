import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ParseSinglePubmedPaperDto {
  @IsString()
  pubmedId: string;
}

export class ParseBulkPubmedPapersDto {
  @IsString()
  search: string;
}

class ExperimentItemDataDto {
  @IsString()
  material?: string;

  @IsString()
  supplier?: string;

  @IsString()
  usage?: string;

  @IsString()
  url?: string;
}

class ExperimentItemDto {
  @IsString()
  id: string;

  @IsObject()
  data: ExperimentItemDataDto;
}

class ExperimentDataDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperimentItemDto)
  items: ExperimentItemDto[];
}

class UpdateExperimentDto {
  @IsNumber()
  id: string;

  @IsObject()
  data: ExperimentDataDto;
}

export class UpdatePaperBodyDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateExperimentDto)
  @IsOptional()
  experiments: UpdateExperimentDto[];
}
