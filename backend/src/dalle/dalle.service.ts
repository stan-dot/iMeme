import { Injectable } from '@nestjs/common';
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

@Injectable()
export class DalleService {
  async getImageUrl(): Promise<string> {
    console.log(process.env.OPENAI_API_KEY)
    return new Promise((resolve, reject) => {
      openai.createImage({
        prompt: 'duck',
        n: 1,
        size: "256x256",
      }).then(response => resolve(response.data.data[0].url))
        .catch(err => reject(err))
    })
  }

}
