import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { ImageObjectDto } from 'src/types/ImageObjectDto';
import { ImageObject, ImageObjectDocument } from './schemas/ImageObject.schema';

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

  async findMatchingKeyword(keyword: string): Promise<ImageObject[]> {
    const filter: FilterQuery<ImageObject> = {
      prompt: {
        $regex: `${keyword}/i`,
      },
    };
    // -1 is for descending, so the most viewed will have the lowest indexes
    return this.imageObjectModel.find(filter).sort({ views: -1 }).exec();
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
