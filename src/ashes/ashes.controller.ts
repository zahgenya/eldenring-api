import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AshesService } from './ashes.service';
import { Ash } from './ash.entity';
import { ashData } from './ash.interface';

@Controller()
export class AshesController {
  constructor(private readonly ashesService: AshesService) {}

  @Get('ashes')
  async getAshes(
    @Query('limit') limit: number
  ): Promise<Ash[]> {
    if (limit && isNaN(limit)) {
      throw new HttpException('Limit param should be a number', HttpStatus.BAD_REQUEST);
    }
    
    const ashes = await this.ashesService.findAll(limit);

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
  async createAsh(@Body() ashesData: ashData[]): Promise<Ash[]> {
    try {
      const newAshes = await this.ashesService.createMany(ashesData);
      return newAshes;
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
