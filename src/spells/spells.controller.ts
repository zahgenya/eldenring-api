import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SpellsService } from './spells.service';
import { Spell } from './spell.entity';
import { magicTypeE, spellData } from './spell.interface';

@Controller()
export class SpellsController {
  constructor(private readonly spellsService: SpellsService) {}

  @Get('spells')
  async getSpells(): Promise<Spell[]> {
    return this.spellsService.findAll();
  }

  @Get('spells/type/:type')
  getSpellsByType(@Param('type') type: magicTypeE): Promise<Spell[]> {
    return this.spellsService.findByMagicType(type);
  }

  @Get('spells/:id')
  getSpellById(@Param('id') id: number): Promise<Spell> {
    return this.spellsService.findOne(id);
  }

  @Post('spells')
  async createSpell(@Body() spellData: spellData): Promise<Spell> {
    return await this.spellsService.create(spellData);
  }
}
