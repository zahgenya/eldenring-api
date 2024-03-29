import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { WeaponsService } from './weapons.service';
import { Weapon } from './weapon.entity';
import { weaponData, weaponTypeE } from './weapon.interface';

@Controller()
export class WeaponsController {
  constructor(private readonly weaponsService: WeaponsService) {}

  @Get('weapons')
  async getWeapons(): Promise<Weapon[]> {
    const weapons = await this.weaponsService.findAll();
    if (weapons.length === 0) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return weapons;
  }

  // There is no enum implementation, need another approach. Maybe pipe.

  @Get('weapons/type/:type')
  async getWeaponsByType(@Param('type') type: weaponTypeE): Promise<Weapon[]> {
    const weapons = await this.weaponsService.findByType(type);
    if (weapons.length === 0) {
      throw new HttpException('Invalid weapons type', HttpStatus.NOT_FOUND);
    }
    return weapons;
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
    try {
      const newWeapon = await this.weaponsService.create(weaponData);
      return newWeapon;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid post body',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        }
      );
    }
  }
}
