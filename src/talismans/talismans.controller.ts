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
import { TalismansService } from './talismans.service';
import { Talisman } from './talisman.entity';
import { talismanData } from './talisman.interface';

@Controller()
export class TalismansController {
  constructor(private readonly talismansService: TalismansService) {}

  @Get('talismans')
  async getTalismans(
    @Query('limit') limit: number
  ): Promise<Talisman[]> {
    if (limit && isNaN(limit)) {
      throw new HttpException('Limit param should be a number', HttpStatus.BAD_REQUEST);
    }

    const talismans = await this.talismansService.findAll(limit)

    if (talismans.length === 0) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return talismans;
  }

  @Get('talismans/:id')
  async getTalisman(@Param('id') id: number): Promise<Talisman> {
    const talisman = await this.talismansService.findOne(id);
    if (!talisman) {
      throw new HttpException('Talisman not found', HttpStatus.NOT_FOUND);
    }
    return talisman;
  }

  @Post('talismans')
  async createTalisman(@Body() talismanData: talismanData): Promise<Talisman> {
    try {
      const newTalisman = await this.talismansService.create(talismanData);
      return newTalisman;
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
