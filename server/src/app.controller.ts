import { AppService } from './app.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @Get('/health')
  healthCheck(): any {
    return { status: this.appService.getStatus() };
  }
}
