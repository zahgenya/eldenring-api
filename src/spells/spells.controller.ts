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
import { SpellsService } from './spells.service';
import { Spell } from './spell.entity';
import { magicTypeE, spellData } from './spell.interface';

@Controller()
export class SpellsController {
  constructor(private readonly spellsService: SpellsService) {}

  @Get('spells')
  async getSpells(
    @Query('magicType') magicType: magicTypeE,
    @Query('limit') limit: number
  ): Promise<Spell[]> {
    if (limit && isNaN(limit)) {
      throw new HttpException('Limit param should be number', HttpStatus.BAD_REQUEST);
    }

    const spells = await this.spellsService.findAll(magicType, limit);

    if (spells.length === 0) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return spells;
  }

  @Get('spells/:id')
  async getSpellById(@Param('id') id: number): Promise<Spell> {
    const spell = await this.spellsService.findOne(id);
    if (!spell) {
      throw new HttpException('Spell not found', HttpStatus.NOT_FOUND);
    }
    return spell;
  }

  @Post('spells')
  async createSpell(@Body() spellsData: spellData[]): Promise<Spell[]> {
    try {
      const newSpells = await this.spellsService.createMany(spellsData);
      return newSpells;
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
