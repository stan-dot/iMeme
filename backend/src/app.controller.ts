import {
  All,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { DalleService } from './dalle/dalle.service';
import { GenConfig } from './types/ImageObjectDto';
import { ImagesResponse, ImagesResponseDataInner } from 'openai';
import { ImageObject } from './database/schemas/ImageObject.schema';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly databaseService: DatabaseService,
    private readonly dalleService: DalleService,
  ) {}

  @Get('dalle')
  getApiDescription(): string {
    return 'hi, that is a dalle api proxy';
  }

  @Get('dalle/:prompt?')
  async getNewImage(
    @Param('prompt') prompt: string,
    @Query('number') number: number,
    @Query('size') size: string,
  ): Promise<string> {
    const requestDto: GenConfig = {
      prompt,
      number,
      size,
    };
    const response: ImagesResponse = await this.dalleService.getImageResponse(
      requestDto,
    );
    const imageObject: ImageObject = {
      prompt: requestDto.prompt,
      dalleUrl: response.data[0].url,
      views: 0,
      creatorId: '',
      desoUrl: '',
    };
    console.log('object: ', imageObject);
    // THAT IS A SIDE EFFECT
    const dbResponse = await this.databaseService.create(imageObject);
    console.log('database response:', dbResponse);
    const innerData: ImagesResponseDataInner[] = response.data;
    const url: string = innerData[0].url;
    return url;
  }

  @Get('library/:params')
  async getLibrary(@Param('params') params: string): Promise<object> {
    console.log(params);
    return Promise.resolve({ ok: true });
  }

  @All('*')
  defaultController(): Promise<string> {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
