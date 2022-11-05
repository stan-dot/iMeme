import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DalleService } from './dalle/dalle.service';
import { TestController } from './test/test.controller';

@Module({
  imports: [],
  controllers: [AppController, TestController],
  providers: [AppService, DalleService],
})
export class AppModule {}
