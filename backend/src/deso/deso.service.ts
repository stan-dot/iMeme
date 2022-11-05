import { Injectable } from '@nestjs/common';
import Deso from 'deso-protocol';
import { UploadImageResponse } from 'deso-protocol-types';

import { ImageObject } from 'src/database/schemas/ImageObject.schema';

@Injectable()
export class DesoService {
  private readonly deso = new Deso();
  async saveImageToDeso(imageObject: ImageObject): Promise<string> {
    const request = {
      UserPublicKeyBase58Check: '',
    };
    const response: UploadImageResponse | void =
      await this.deso.media.uploadImage(request);
    if (!response) return '';
    return response.ImageURL;
  }
}
