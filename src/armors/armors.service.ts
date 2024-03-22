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

  findAll(): Promise<Armor[]> {
    return this.armorRepository.find()
  }

  findOne(id: number): Promise<Armor> {
    return this.armorRepository.findOneBy({ id: id })
  }

  async create(armorData: armorData): Promise<Armor> {
    const newArmor = new Armor;
    newArmor.name = armorData.name;
    newArmor.description = armorData.description;
    newArmor.category = armorData.category;
    newArmor.weight = armorData.weight;
    newArmor.dmgNegation = armorData.dmgNegation;
    newArmor.resistance = armorData.resistance;
    return await this.armorRepository.save(newArmor);
  }
}
