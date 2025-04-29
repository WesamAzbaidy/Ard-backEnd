import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
import { PaginationDto } from './dto/paginationDto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@Inject('USERS_MODEL') private readonly userModel: Model<User>) {}

  async findAll(paginationDto: PaginationDto): Promise<{
    users: User[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.userModel.find().skip(skip).limit(limit).exec(),
      this.userModel.countDocuments(),
    ]);

    return {
      users,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({
      $or: [
        { email: createUserDto.email },
        { username: createUserDto.username },
      ],
    });

    if (existingUser) {
      if (existingUser.email === createUserDto.email) {
        throw new BadRequestException('Email is already registered');
      }
      if (existingUser.username === createUserDto.username) {
        throw new BadRequestException('Username is already taken');
      }
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<User | null> {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async toggleActiveStatus(id: string, active: boolean): Promise<User | null> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    user.active = active;
    return user.save();
  }

  async seedAdminUser(): Promise<void> {
    const adminExists = await this.userModel.findOne({
      email: 'admin@gmail.com',
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('test@123', 10);

      const adminUser = new this.userModel({
        firstName: 'wesam',
        lastName: 'Azbaidy',
        email: 'admin@gmail.com',
        username: 'admin',
        password: hashedPassword,
        age: 26,
        role: 'admin',
        active: true,
      });

      await adminUser.save();
      console.log('Admin user created successfully!');
    } else {
      console.log('Admin user already exists.');
    }
  }
}
