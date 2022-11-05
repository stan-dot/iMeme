import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as config from 'config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DalleService } from './dalle/dalle.service';
import { DatabaseService } from './database/database.service';
import { ImageObjectSchema } from './database/ImageObject.schema';
import { DesoService } from './deso/deso.service';
import { LibraryController } from './library/library.controller';
import { TestController } from './test/test.controller';

console.log(process.env);
const mongoUrl = config.get('mongo.url') as string;

@Module({
  imports: [MongooseModule.forRoot(mongoUrl), ImageObjectSchema],
  controllers: [AppController, TestController, LibraryController],
  providers: [AppService, DalleService, DatabaseService, DesoService],
})
export class AppModule {}
