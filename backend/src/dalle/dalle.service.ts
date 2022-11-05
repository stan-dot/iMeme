import { Injectable } from '@nestjs/common';
import { Configuration, CreateImageRequest, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

@Injectable()
export class DalleService {
  async getImageUrl(): Promise<string> {
    console.log(process.env.OPENAI_API_KEY)
    return new Promise((resolve, reject) => {
      const newLocal: CreateImageRequest = {
        prompt: 'duck',
        n: 1,
        size: '256x256',
      };
      openai
        .createImage(newLocal)
        .then((requestConfig) => resolve(requestConfig.data.data[0].url))
        .catch((err) => reject(err));
    });
  }
}
