

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DalleService } from './dalle/dalle.service';


@Module({
  imports: [],
  providers: [AppService, DalleService],
  controllers: [AppController],
})
export class AppModule {}
