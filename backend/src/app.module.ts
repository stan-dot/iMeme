import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as config from 'config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DalleService } from './dalle/dalle.service';
import { DatabaseModule } from './database/database.module';

console.log(process.env);
const mongoUrl = config.get('mongo.url') as string;

@Module({
  imports: [MongooseModule.forRoot(mongoUrl), DatabaseModule],
  // imports: [],
  providers: [AppService, DalleService],
  controllers: [AppController],
})
export class AppModule {}
