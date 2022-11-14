import { Controller, Get } from '@nestjs/common';

@Controller()
export class RootController {
  @Get()
  getRootMessage() {
    return 'Hello this is root';
  }
}
