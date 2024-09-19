import { IsOptional, IsString } from 'class-validator';

export class PaginationQueryDto {
  @IsString()
  @IsOptional()
  page?: string;
}
