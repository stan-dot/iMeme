import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { DalleService } from './dalle/dalle.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dalleService: DalleService) { }

  @Get('dalle/:prompt?')
  async getHello(
    @Param('prompt') prompt: string,
    @Query('number') number: number,
    @Query('size') size: number
  ): Promise<string> {
    return this.dalleService.getImageUrl({
      prompt, number, size
    })
  }

  @Get('library/:params')
  async getLibrary(
    @Param('params') params: string
  ): Promise<object> {
    console.log(params)
    return Promise.resolve({ ok: true })
  }
}
