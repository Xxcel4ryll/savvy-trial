import { IsOptional, IsString, Allow } from 'class-validator';

export class FindDataRequestDto {
  @IsOptional()
  @IsString()
  searchBy: string;

  @IsOptional()
  searchParam: string;
  @IsOptional()
  year?: string;
  @IsOptional()
  month?: number;
  @IsOptional()
  date1?: any;
  @IsOptional()
  date2?: any;

  // @IsOptional()
  // month: string;

  // @Allow('INDIVIDUAL')
  @IsOptional()
  type: string;

  @IsOptional()
  from: string;

  @IsOptional()
  to: string;

  @IsOptional()
  @IsString()
  page: string;

  @IsOptional()
  @IsString()
  size: string;
}