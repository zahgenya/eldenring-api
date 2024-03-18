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

  findAll(): Promise<Talisman[]> {
    return this.talismansRepository.find();
  }

  findOne(id: number): Promise<Talisman> {
    return this.talismansRepository.findOneBy({ id })
  }

  async create(talismanData: talismanData): Promise<Talisman> {
    const newTalisman = new Talisman();
    newTalisman.name = talismanData.name;
    newTalisman.description = talismanData.description;
    newTalisman.effects = talismanData.effects;
    return await this.talismansRepository.save(newTalisman);
  }
}
