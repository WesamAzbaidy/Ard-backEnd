import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @IsNotEmpty()
  @IsString()
  readonly country: string;

  @IsNotEmpty()
  @IsNumber()
  readonly latitude: number;

  @IsNotEmpty()
  @IsNumber()
  readonly longitude: number;

  @IsOptional()
  @IsString()
  readonly description?: string;
}
