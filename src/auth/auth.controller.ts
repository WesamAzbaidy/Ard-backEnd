import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: AuthUserDto) {
    try {
      const user = await this.authService.validateUser(body);

      if (!user) {
        throw new UnauthorizedException(
          'Incorrect email or password. Please try again.',
        );
      }

      return this.authService.login(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new BadRequestException(
        'Authentication failed. Please check your credentials and try again.',
      );
    }
  }
}
