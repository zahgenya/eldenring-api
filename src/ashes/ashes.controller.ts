import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AshesService } from './ashes.service';
import { Ash } from './ash.entity';
import { ashData } from './ash.interface';

@Controller()
export class AshesController {
  constructor(private readonly ashesService: AshesService) {}

  @Get('ashes')
  getAshes(): Promise<Ash[]> {
    return this.ashesService.findAll()
  }

  @Get('ashes/:id')
  getAshById(@Param('id') id: number): Promise<Ash> {
    return this.ashesService.findOne(id);
  }

  @Post('ashes')
  async createAsh(@Body() ashData: ashData): Promise<Ash> {
    return await this.ashesService.create(ashData);
  }
}
