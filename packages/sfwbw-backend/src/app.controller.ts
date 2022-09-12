import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): any {
    return {
      time: new Date(),
      message: 'hello world',
    };
  }
}
