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

  findByMagicType(magicType: magicTypeE): Promise<Spell[]> {
    return this.spellsRepository.findBy({ magicType: magicType })
  }

  async create(spellData: spellData): Promise<Spell> {
    const newSpell = this.spellsRepository.create(spellData);
    return await this.spellsRepository.save(newSpell);
  }
}
