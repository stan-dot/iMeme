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
    // console.log('query: ', query);
    const numberRequested: number =
      query.number >= 1 && query.number <= 10 ? query.number : 1 ?? 1;
    console.log('line 24')
    console.log(typeof numberRequested)
    const sizeRequested: string = allowedSize.includes(query.size)
      ? query.size
      : allowedSize[0];

    const promptRequested = query.prompt.replace(/_/g, ' ')

    const sanitizedRequest: CreateImageRequest = {
      prompt: promptRequested,
      n: (numberRequested),
      size: sizeRequested as CreateImageRequestSizeEnum,
    };
    console.log(sanitizedRequest)
    return sanitizedRequest;
  }
  public async getImageResponse(arg: GenConfig): Promise<ImagesResponse> {
    const request: CreateImageRequest = this._querySanitizer(arg);
    const testReq: CreateImageRequest = { prompt: 'hello world', n: 1, size: '256x256' }
    console.log(request)
    console.log(testReq)

    return new Promise((resolve, reject) => {
      openai
        // .createImage({prompt: 'hello', n: 1, size: '256x256'})
        .createImage(testReq)
        .then((response: AxiosResponse<ImagesResponse, any>) => {
          const data: ImagesResponse = response.data;
          resolve(data);
        })
        .catch((err) => {
          console.log(err.response.data)
          reject(err)
        });
    });
  }
}
