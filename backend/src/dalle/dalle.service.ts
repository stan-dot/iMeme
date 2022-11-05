import { Injectable } from '@nestjs/common';
import { Configuration, CreateImageRequest, OpenAIApi } from 'openai';
import { ImageObjectDto } from 'src/types/ImageObjectDto';
import { querySanitizer } from './../utils/queryConverter';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

@Injectable()
export class DalleService {
  async getImageUrl(arg: ImageObjectDto): Promise<string> {
    const request: CreateImageRequest = querySanitizer(arg);
    return new Promise((resolve, reject) => {
      openai
        .createImage(request)
        .then((response) => resolve(response.data.data[0].url))
        .catch((err) => reject(err));
    });
  }
}
