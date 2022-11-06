import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ImageObjectDocument = HydratedDocument<ImageObject>;

@Schema()
export class ImageObject {
  @Prop()
  prompt: string;

  @Prop()
  views: number;

  @Prop()
  creatorId: string;

  @Prop()
  dalleUrl: string;

  @Prop({ required: false })
  desoUrl: string;
}

export const ImageObjectSchema = SchemaFactory.createForClass(ImageObject);
