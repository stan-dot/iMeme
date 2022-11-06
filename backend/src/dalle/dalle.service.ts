import { Injectable } from '@nestjs/common';
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
const openai = new OpenAIApi(configuration);

@Injectable()
export class DalleService {
  private _querySanitizer(query: GenConfig): CreateImageRequest {
    console.log('query: ', query);
    const numberRequested: number =
      query.number >= 1 && query.number <= 10 ? query.number : 1 ?? 1;
    const sizeRequested: string = allowedSize.includes(query.size)
      ? query.size
      : allowedSize[0];
    const sanitizedRequest: CreateImageRequest = {
      prompt: '',
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
        .catch((err) => reject(err));
    });
  }
}
