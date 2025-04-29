import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthUserDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  readonly email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  readonly password: string;
}
