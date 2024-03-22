import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { WeaponsService } from './weapons.service';
import { Weapon } from './weapon.entity';
import { weaponData, weaponTypeE } from './weapon.interface';

@Controller()
export class WeaponsController {
  constructor(private readonly weaponsService: WeaponsService) {}

  @Get('weapons')
  getWeapons(): Promise<Weapon[]> {
    return this.weaponsService.findAll();
  }

// There is no enum implementation, need another approach. Maybe pipe.

  @Get('weapons/type/:type')
  getWeaponsByType(@Param('type') type: weaponTypeE): Promise<Weapon[]> {
  return this.weaponsService.findByType(type);
}

  @Get('weapons/:id')
  async getWeaponById(@Param('id') id: number): Promise<Weapon> {
   const weapon = await this.weaponsService.findOne(id);
   if (!weapon) {
     throw new HttpException('Weapon not found', HttpStatus.NOT_FOUND);
   }
   return weapon;
  }

  @Post('weapons')
  async createWeapon(@Body() weaponData: weaponData): Promise<Weapon> {
    return await this.weaponsService.create(weaponData);
  }
}