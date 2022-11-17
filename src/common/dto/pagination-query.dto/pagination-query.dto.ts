import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  offset: number;

  @IsOptional()
  @IsPositive()
  limit: number;
}
