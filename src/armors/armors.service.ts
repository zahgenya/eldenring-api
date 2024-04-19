import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Armor } from './armor.entity';
import { armorData } from './armor.interface';

@Injectable()
export class ArmorsService {
  constructor (
    @InjectRepository(Armor)
    private armorRepository: Repository<Armor>
  ) {}

  async findAll(limit?: number): Promise<Armor[]> {
    let queryBuilder = this.armorRepository.createQueryBuilder();

    if (limit) {
      queryBuilder = queryBuilder.take(limit);
    }

    return await queryBuilder.getMany();
  }

  findOne(id: number): Promise<Armor> {
    return this.armorRepository.findOneBy({ id: id })
  }

  async createMany(armorsData: armorData[]): Promise<Armor[]> {
    const newArmors: Armor[] = [];

    for (const data of armorsData) {
      const newArmor = this.armorRepository.create(data);
      const savedArmor = await this.armorRepository.save(newArmor);
      newArmors.push(savedArmor);
    }

    return newArmors
  }
}
