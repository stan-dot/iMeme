import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ImageObjectDocument = HydratedDocument<ImageObject>;

@Schema()
export class ImageObject {
  @Prop({ required: true })
  data: string;

  @Prop()
  prompt: string;

  @Prop()
  views: number;

  @Prop()
  creatorId: string;
}

export const ImageObjectSchema = SchemaFactory.createForClass(ImageObject);
