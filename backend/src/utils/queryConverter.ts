import { CreateImageRequest, CreateImageRequestSizeEnum } from 'openai';
import { ImageObjectDto } from 'src/types/ImageObjectDto';

const allowedSize: string[] = ['256x256', '512x512', '1024x1024'];

export function querySanitizer(query: ImageObjectDto): CreateImageRequest {
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
