import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from './domainModel/User.interface';
import { UserAuth } from './domainModel/UserAuth.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userAuth: UserAuth): Promise<any> {
    const user = await this.userService.findByEmail(userAuth.email);

    // Check if user exists
    if (!user) {
      return null;
    }

    // Check if user is active
    if (!user.active) {
      throw new UnauthorizedException(
        'Your account is currently inactive. Please contact an administrator for assistance.',
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      userAuth.password,
      user.password,
    );
    if (!isPasswordValid) {
      return null;
    }

    const { password, ...result } = user.toObject();
    return result;
  }

  async login(user: User) {
    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      active: user.active,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
