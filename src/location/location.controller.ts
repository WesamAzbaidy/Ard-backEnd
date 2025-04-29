import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/createLocationDTO';
import { PaginationDto } from '../user/dto/paginationDto';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/decorator/roles.decorator';

@Controller('location')
@UseGuards(RolesGuard)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  @Roles('admin')
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.locationService.findAll(paginationDto);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles('admin')
  async create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }
  @Roles('admin')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedLocation = await this.locationService.delete(id);
    return {
      message: 'Location deleted successfully',
      location: deletedLocation,
    };
  }
}
