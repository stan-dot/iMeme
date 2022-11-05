import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as config from 'config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DalleService } from './dalle/dalle.service';
import { DatabaseService } from './database/database.service';

console.log(process.env);
const mongoUrl = config.get('mongo.url') as string;

@Module({
  imports: [MongooseModule.forRoot(mongoUrl)],
  providers: [AppService, DalleService, DatabaseService],
  controllers: [AppController],
})
export class AppModule {}
