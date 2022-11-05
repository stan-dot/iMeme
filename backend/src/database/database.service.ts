import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ImageObject, ImageObjectDocument } from 'schemas/ImageObject.schema';
import { ImageObjectDto } from 'src/types/ImageObjectDto';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectModel(ImageObject.name)
    private readonly imageObjectModel: Model<ImageObjectDocument>,
  ) {}

  getImage(): string {
    return 'this will talk to some databse';
  }

  async create(createImageDto: ImageObjectDto): Promise<ImageObject> {
    const createdCat = new this.imageObjectModel(createImageDto);
    return createdCat.save();
  }

  async findAll(): Promise<ImageObject[]> {
    return this.imageObjectModel.find().exec();
  }

  async findOne(id: string): Promise<ImageObject> {
    return this.imageObjectModel.findOne({ _id: id }).exec();
  }

  /**
   * NOT IN USE
   * @param id
   * @returns
   */
  async delete(id: string) {
    const deletedImage = await this.imageObjectModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedImage;
  }
}
