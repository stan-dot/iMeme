import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ImageObjectDto } from 'src/types/ImageObjectDto';
import { DatabaseService } from './database.service';
import { ImageObject } from './schemas/ImageObject.schema';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Post()
  async create(@Body() createCatDto: ImageObjectDto) {
    await this.databaseService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<ImageObject[]> {
    return this.databaseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ImageObjectDto> {
    return this.databaseService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.databaseService.delete(id);
  }
}
