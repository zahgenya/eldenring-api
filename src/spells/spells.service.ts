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

  async findAll(magicType?: magicTypeE, limit?: number): Promise<Spell[]> {
    let queryBuilder = this.spellsRepository.createQueryBuilder('spell')

    if (magicType) {
      queryBuilder = queryBuilder.where('spell.magicType = :magicType', { magicType });
    }

    if (limit) {
      queryBuilder = queryBuilder.take(limit)
    }

    return await queryBuilder.getMany()
  }

  findOne(id: number): Promise<Spell> {
    return this.spellsRepository.findOneBy({ id: id });
  }

  async createMany(spellsData: spellData[]): Promise<Spell[]> {
    const newSpells: Spell[] = [];

    for (const data of spellsData) {
      const newSpell = this.spellsRepository.create(data);
      const savedSpell = await this.spellsRepository.save(newSpell);
      newSpells.push(savedSpell);
    }

    return newSpells;
  }
}
