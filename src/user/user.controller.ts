import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
  Patch,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
import { PaginationDto } from './dto/paginationDto';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../decorator/roles.decorator';

@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles('admin')
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.userService.findAll(paginationDto);
  }

  @Get(':id')
  @Roles('admin')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Post()
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @Roles('admin')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles('admin')
  async delete(@Param('id') id: string) {
    const deletedUser = await this.userService.delete(id);
    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return {
      message: 'User deleted successfully',
      user: deletedUser,
    };
  }

  @Patch(':id/activate')
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  async activateUser(@Param('id') id: string): Promise<User | null> {
    return this.userService.toggleActiveStatus(id, true);
  }

  @Patch(':id/deactivate')
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  async deactivateUser(@Param('id') id: string): Promise<User | null> {
    return this.userService.toggleActiveStatus(id, false);
  }
}
