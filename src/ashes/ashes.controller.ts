import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AshesService } from './ashes.service';
import { Ash } from './ash.entity';
import { ashData } from './ash.interface';

@Controller()
export class AshesController {
  constructor(private readonly ashesService: AshesService) {}

  @Get('ashes')
  async getAshes(): Promise<Ash[]> {
    const ashes = await this.ashesService.findAll();
    if (ashes.length === 0) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return ashes;
  }

  @Get('ashes/:id')
  async getAshById(@Param('id') id: number): Promise<Ash> {
    const ash = await this.ashesService.findOne(id);
    if (!ash) {
      throw new HttpException('Ash not found', HttpStatus.NOT_FOUND);
    }
    return ash;
  }

  @Post('ashes')
  async createAsh(@Body() ashData: ashData): Promise<Ash> {
    try {
      const newAsh = await this.ashesService.create(ashData);
      return newAsh;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid post body',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        }
      );
    }
  }
}
