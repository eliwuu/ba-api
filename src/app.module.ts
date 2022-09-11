import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DistanceService } from './distance/distance.service';
import { StatsController } from './stats/stats.controller';
import { TripsController } from './trips/trips.controller';

@Module({
  imports: [],
  controllers: [AppController, StatsController, TripsController],
  providers: [AppService, DistanceService],
})
export class AppModule {}
