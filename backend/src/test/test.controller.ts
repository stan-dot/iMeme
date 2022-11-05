import { Controller, Get } from '@nestjs/common';
import { DalleService } from 'src/dalle/dalle.service';

@Controller('test')
export class TestController {
  constructor(private readonly dalleService: DalleService) {}

  @Get()
  getHello(): Promise<string> {
    return this.dalleService.getImageUrl();
  }
}
