import {
  IsEmail,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsEnum,
  Min,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly firstName?: string;

  @IsOptional()
  @IsString()
  readonly lastName?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly username?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly age?: number;

  @IsOptional()
  @IsEnum(['admin', 'user'])
  readonly role?: string;

  @IsOptional()
  @IsBoolean()
  readonly active?: boolean;
}
