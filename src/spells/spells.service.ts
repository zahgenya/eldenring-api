import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Spell } from './spell.entity';
import { Repository } from 'typeorm';
import { magicTypeE, spellData } from './spell.interface';

@Injectable()
export class SpellsService {
  constructor(
    @InjectRepository(Spell)
    private spellsRepository: Repository<Spell>
  ) {}

  findAll(): Promise<Spell[]> {
    return this.spellsRepository.find();
  }

  findOne(id: number): Promise<Spell> {
    return this.spellsRepository.findOneBy({ id: id });
  }

  findByMagicType(magicType: magicTypeE): Promise<Spell[]> {
    return this.spellsRepository.findBy({ magicType: magicType })
  }

  async create(spellData: spellData): Promise<Spell> {
    const newSpell = new Spell();
    newSpell.name = spellData.name;
    newSpell.description = spellData.description;
    newSpell.spellType = spellData.spellType;
    newSpell.magicType = spellData.magicType;
    newSpell.cost = spellData.cost;
    newSpell.slots = spellData.slots;
    newSpell.effects = spellData.effects;
    newSpell.requires = spellData.requires;
    return await this.spellsRepository.save(newSpell);
  }
}
