import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Location } from '../interfaces/location.interface';
import { CreateLocationDto } from './dto/createLocationDTO';
import { PaginationDto } from '../user/dto/paginationDto';

@Injectable()
export class LocationService {
  constructor(
    @Inject('LOCATIONS_MODEL') private readonly locationModel: Model<Location>,
  ) {}

  async findAll(paginationDto: PaginationDto): Promise<{
    locations: Location[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [locations, total] = await Promise.all([
      this.locationModel.find().skip(skip).limit(limit).exec(),
      this.locationModel.countDocuments(),
    ]);

    return {
      locations,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const createdLocation = new this.locationModel(createLocationDto);
    return createdLocation.save();
  }

  async delete(id: string): Promise<Location | null> {
    const location = await this.locationModel.findByIdAndDelete(id).exec();
    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
    return location;
  }
}
