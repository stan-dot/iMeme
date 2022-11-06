import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { DalleService } from './dalle/dalle.service';
import { ImageObjectDto } from './types/ImageObjectDto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dalleService: DalleService,
  ) {}

  @Get()
  test() {
    return this.appService.getHello()
  }

  @Get('dalle/:prompt?')
  async getHello(
    @Param('prompt') prompt: string,
    @Query('number') number: number,
    @Query('size') size: string,
  ): Promise<string> {
    const dto: ImageObjectDto = {
      prompt,
      number,
      size,
    };
    return this.dalleService.getImageUrl(dto);
  }

  // @Get('library/:params')
  // async getLibrary(@Param('params') params: string): Promise<object> {
  //   console.log(params);
  //   return Promise.resolve({ ok: true });
  // }
}
