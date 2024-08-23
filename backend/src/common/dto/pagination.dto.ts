import { IsNumber, IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @IsNumber()
  @IsOptional()
  page?: string;
}
