import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DistanceService } from './distance/distance.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly distanceService: DistanceService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('distance')
  async getDistance(): Promise<string> {
    return (
      await this.distanceService.calculateByStreetName('ab,cd,ef', 'ab,cde,ef')
    ).toString();
  }
}
