import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();
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
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
console.log('open ai connection config', configuration);
const openai = new OpenAIApi(configuration);

@Injectable()
export class DalleService {
  private _querySanitizer(query: GenConfig): CreateImageRequest {
    console.log('query: ', query);
    const number = query.number ?? 1;
    console.log('number:', number);
    const numberRequested: number = number >= 1 && number <= 10 ? number : 1;
    const size = query.size ?? allowedSize[0];
    const sizeRequested: string = allowedSize.includes(size)
      ? size
      : allowedSize[0];

    const promptRequested = query.prompt.replace(/_/g, ' ')

    const sanitizedRequest: CreateImageRequest = {
      prompt: promptRequested,
      n: (numberRequested),
      size: sizeRequested as CreateImageRequestSizeEnum,
    };
    console.log('sanitized', sanitizedRequest);
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
