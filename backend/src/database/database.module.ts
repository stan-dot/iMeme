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
  ],
  controllers: [DatabaseController],
  providers: [DatabaseService],
  exports: [
    MongooseModule.forFeature([
      { name: ImageObject.name, schema: ImageObjectSchema },
    ]),
    DatabaseService,
  ],
})
export class DatabaseModule {}
