import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { locationProviders } from './location.providers';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [LocationController],
  providers: [LocationService, ...locationProviders],
})
export class LocationModule {}
