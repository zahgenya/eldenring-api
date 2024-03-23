import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { SpellsService } from './spells.service';
import { Spell } from './spell.entity';
import { magicTypeE, spellData } from './spell.interface';

@Controller()
export class SpellsController {
  constructor(private readonly spellsService: SpellsService) {}

  @Get('spells')
  async getSpells(): Promise<Spell[]> {
    const spells = await this.spellsService.findAll();
    if (spells.length === 0) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return spells;
  }

  @Get('spells/type/:type')
  async getSpellsByType(@Param('type') type: magicTypeE): Promise<Spell[]> {
    const spells = await this.spellsService.findByMagicType(type);
    if (spells.length === 0) {
      throw new HttpException('Invalid spells type', HttpStatus.NOT_FOUND);
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
  async createSpell(@Body() spellData: spellData): Promise<Spell> {
    try {
      const newSpell = await this.spellsService.create(spellData);
      return newSpell;
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
