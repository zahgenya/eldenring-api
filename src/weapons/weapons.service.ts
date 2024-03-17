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

  findAll(): Promise<Weapon[]> {
    return this.weaponsRepository.find();
  }

  findOne(id: number): Promise<Weapon> {
    return this.weaponsRepository.findOneBy({ id });
  }

  findByType(type: weaponTypeE): Promise<Weapon[]> {
    return this.weaponsRepository.findBy({ type: type })
  }

  async create(weaponData: weaponData): Promise<Weapon> {
    const newWeapon = new Weapon();
    newWeapon.name = weaponData.name;
    newWeapon.weight = weaponData.weight;
    newWeapon.type = weaponData.type;
    newWeapon.skill = weaponData.skill;
    newWeapon.description = weaponData.description;
    newWeapon.damage = weaponData.damage;
    newWeapon.guard = weaponData.guard;
    newWeapon.scaling = weaponData.scaling;
    newWeapon.requires = weaponData.requires;
    return await this.weaponsRepository.save(newWeapon);
  }
}
