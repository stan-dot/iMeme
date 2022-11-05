import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';
import { ImageObject, ImageObjectSchema } from './schemas/ImageObject.schema';

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
  controllers: [DatabaseController],
  providers: [DatabaseService],
  exports: [
    MongooseModule.forFeature([
      { name: ImageObject.name, schema: ImageObjectSchema },
    ]),
  ],
})
export class DatabaseModule {}
