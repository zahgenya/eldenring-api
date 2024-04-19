import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Weapon } from './weapon.entity';
import { weaponData, weaponTypeE } from './weapon.interface';

@Injectable()
export class WeaponsService {
  constructor(
    @InjectRepository(Weapon)
    private weaponsRepository: Repository<Weapon>
  ) {}

  async findAll(type?: weaponTypeE, limit?: number): Promise<Weapon[]> {
    let queryBuilder = this.weaponsRepository.createQueryBuilder('weapon')

    if (type) {
      queryBuilder = queryBuilder.where('weapon.type = :type', { type });
    }

    if (limit) {
      queryBuilder = queryBuilder.take(limit);
    }

    return await queryBuilder.getMany();
  }

  findOne(id: number): Promise<Weapon> {
    return this.weaponsRepository.findOneBy({ id: id });
   }

  async createMany(weaponsData: weaponData[]): Promise<Weapon[]> {
    const newWeapons: Weapon[] = [];

    for (const data of weaponsData) {
      const newWeapon = this.weaponsRepository.create(data);
      const savedWeapon = await this.weaponsRepository.save(newWeapon);
      newWeapons.push(savedWeapon);
    }

    return newWeapons;
  }
}
