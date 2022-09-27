import { Controller, Get } from '@nestjs/common';

@Controller('/app')
export class AppController {
  @Get('/hello')
  hello() {
    return { msg: 'hello' };
  }

  @Get('/empty')
  empty() {
    return undefined;
  }
}
