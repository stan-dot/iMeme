import { Controller, Delete, Get, Param } from '@nestjs/common';
import { GenConfig } from 'src/types/ImageObjectDto';
import { DatabaseService } from './database.service';
import { ImageObject } from './schemas/ImageObject.schema';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  // @Post()
  // async create(@Body() object: ImageObject) {
  //   await this.databaseService.create(object);
  // }

  @Get('all')
  async findAll(): Promise<ImageObject[]> {
    return this.databaseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GenConfig> {
    return this.databaseService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.databaseService.delete(id);
  }
}
