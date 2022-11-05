import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database.service';
import { ImageObject, ImageObjectSchema } from './ImageObject.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ImageObject.name, schema: ImageObjectSchema },
    ]),
    // MongooseModule.forFeatureAsync([
    //   {
    //     name: ImageObject.name,
    //     useFactory: () => {
    //       const schema = ImageObjectSchema;
    //       schema.pre('save', () => console.log('Hello from pre save'));
    //       return schema;
    //     },
    //   },
    // ]),
  ],
  providers: [DatabaseService],
  exports: [ImageObject],
})
export class DatabaseModule {}
