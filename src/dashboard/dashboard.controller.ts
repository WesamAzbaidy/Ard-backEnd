import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/decorator/roles.decorator';

// @UseGuards(RolesGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
  // @Roles('admin')
  @Get('weather')
  async getWeather(@Query('q') q: string, @Query('key') key: string) {
    const weatherData = await this.dashboardService.getWeather(q, key);
    return weatherData;
  }
}
