import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as config from 'config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DalleService } from './dalle/dalle.service';
import { DatabaseModule } from './database/database.module';

let mongoUrl = config.get('mongo.url') as string;
// if (mongoUrl.length > 60 && process.env.MONGO_DB_PASSWORD) {
mongoUrl = mongoUrl.replace('<password>', process.env.MONGO_DB_PASSWORD);
// }

@Module({
  imports: [MongooseModule.forRoot(mongoUrl), DatabaseModule],
  providers: [AppService, DalleService],
  controllers: [AppController],
})
export class AppModule {}
