// dashboard.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    HttpModule,
    // JwtModule.register({
    //   secret: 'secretKey',
    //   signOptions: { expiresIn: '1h' },
    // }),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
