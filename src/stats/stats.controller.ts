import { Controller, Get } from '@nestjs/common';

@Controller('stats')
export class StatsController {
  @Get('/weekly')
  async GetWeekly(options?: { startDate: Date }) {}

  @Get('monthly')
  async GetMonthly(options?: { startDate: Date; stopDate: Date }) {}
}
