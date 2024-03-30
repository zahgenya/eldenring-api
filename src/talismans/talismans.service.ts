import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Talisman } from './talisman.entity';
import { Repository } from 'typeorm';
import { talismanData } from './talisman.interface';

@Injectable()
export class TalismansService {
  constructor(
    @InjectRepository(Talisman)
    private talismansRepository: Repository<Talisman>
  ) {}

  async findAll(limit?: number): Promise<Talisman[]> {
    let queryBuilder = this.talismansRepository.createQueryBuilder('talisman')

    if (limit) {
      queryBuilder.take(limit);
    }

    return await queryBuilder.getMany();
  }

  findOne(id: number): Promise<Talisman> {
    return this.talismansRepository.findOneBy({ id: id })
  }

  async create(talismanData: talismanData): Promise<Talisman> {
    const newTalisman = new Talisman();
    newTalisman.name = talismanData.name;
    newTalisman.description = talismanData.description;
    newTalisman.effects = talismanData.effects;
    return await this.talismansRepository.save(newTalisman);
  }
}
