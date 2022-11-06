import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AxiosResponse } from 'axios';
import {
  Configuration,
  CreateImageRequest,
  CreateImageRequestSizeEnum,
  ImagesResponse,
  OpenAIApi,
} from 'openai';
import { GenConfig } from 'src/types/ImageObjectDto';

const allowedSize: string[] = ['256x256', '512x512', '1024x1024'];
const config: dotenv.DotenvConfigOutput = dotenv.config();
const configuration = new Configuration({
  apiKey: config.parsed['OPEN_API_KEY'],
});
console.log('open ai connection config', configuration);
const openai = new OpenAIApi(configuration);

@Injectable()
export class DalleService {
  private _querySanitizer(query: GenConfig): CreateImageRequest {
    const number = query.number ?? 1;
    const numberRequested: number = number >= 1 && number <= 10 ? number : 1;
    const size = query.size ?? allowedSize[0];
    const sizeRequested: string = allowedSize.includes(size)
      ? size
      : allowedSize[0];

    const promptRequested = query.prompt.replace(/_/g, ' ');

    const sanitizedRequest: CreateImageRequest = {
      prompt: promptRequested,
      n: numberRequested,
      size: sizeRequested as CreateImageRequestSizeEnum,
    };
    return sanitizedRequest;
  }
  public async getImageResponse(arg: GenConfig): Promise<ImagesResponse> {
    const request: CreateImageRequest = this._querySanitizer(arg);
    return new Promise((resolve, reject) => {
      openai
        .createImage(request)
        .then((response: AxiosResponse<ImagesResponse, any>) => {
          const data: ImagesResponse = response.data;
          resolve(data);
        })
        .catch((err) => {
          console.log('open ai rejected request');
          reject(err);
        });
    });
  }
}
