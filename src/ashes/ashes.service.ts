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

  async findAll(limit?: number): Promise<Ash[]> {
    let queryBuilder = this.ashesRepository.createQueryBuilder();

    if (limit) {
      queryBuilder = queryBuilder.take(limit)
    }

    return await queryBuilder.getMany();
  }

  findOne(id: number): Promise<Ash> {
    return this.ashesRepository.findOneBy({ id: id })
  }

  async create(ashData: ashData): Promise<Ash> {
    const newAsh = this.ashesRepository.create(ashData);
    return await this.ashesRepository.save(newAsh);
  }
}
