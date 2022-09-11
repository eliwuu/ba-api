import { Controller, Get } from '@nestjs/common';

@Controller('stats')
export class StatsController {
  @Get('/weekly')
  async GetWeekly(options?: { startDate?: Date }) {
    return new Promise((resolve, _reject) => {
      resolve({ distance: '123km', total: '2342.90PLN' });
    });
  }

  @Get('monthly')
  async GetMonthly(options?: { startDate?: Date; stopDate?: Date }) {
    return new Promise((resolve, _reject) => {
      resolve({ distance: '123km', total: '2342.90PLN' });
    });
  }
}
