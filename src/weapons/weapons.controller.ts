import { Controller, Get, Post, Body, Param, UsePipes } from '@nestjs/common';
import { WeaponsService } from './weapons.service';
import { Weapon } from './weapon.entity';
import { weaponData, weaponTypeE } from './weapon.interface';

@Controller()
export class WeaponsController {
  constructor(private readonly weaponsService: WeaponsService) {}

  @Get('weapons')
  async getWeapons(): Promise<Weapon[]> {
    return this.weaponsService.findAll();
  }

// There is no enum implementation, need another approach. Maybe pipe.

  @Get('weapons/:type')
  getWeaponsByType(@Param('type') type: weaponTypeE): Promise<Weapon[]> {
  return this.weaponsService.findByType(type);
}

  @Post('weapons')
  async createWeapon(@Body() weaponData: weaponData): Promise<Weapon> {
    return await this.weaponsService.create(weaponData);
  }
}