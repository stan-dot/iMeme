import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import config from 'config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DalleService } from './dalle/dalle.service';
import { DatabaseService } from './database/database.service';
import { LibraryController } from './library/library.controller';
import { TestController } from './test/test.controller';

const mongoUrl = config.get('mongo.url') as string;
@Module({
  imports: [MongooseModule.forRoot(mongoUrl)],
  controllers: [AppController, TestController, LibraryController],
  providers: [AppService, DalleService, DatabaseService],
})
export class AppModule {}
