import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ash } from './ash.entity';
import { Repository } from 'typeorm';
import { ashData } from './ash.interface';

@Injectable()
export class AshesService {
  constructor(
    @InjectRepository(Ash)
    private ashesRepository: Repository<Ash>
  ) {}

  findAll(): Promise<Ash[]> {
    return this.ashesRepository.find()
  }

  findOne(id: number): Promise<Ash> {
    return this.ashesRepository.findOneBy({ id: id })
  }

  async create(ashData: ashData): Promise<Ash> {
    const newAsh = new Ash();
    newAsh.name = ashData.name;
    newAsh.description = ashData.description;
    newAsh.affinity = ashData.affinity
    newAsh.skill = ashData.skill
    return await this.ashesRepository.save(newAsh);
  }
}
