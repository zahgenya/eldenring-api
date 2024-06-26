import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Query,
  Logger,
} from '@nestjs/common';
import { WeaponsService } from './weapons.service';
import { Weapon } from './weapon.entity';
import { weaponData, weaponTypeE } from './weapon.interface';

@Controller()
export class WeaponsController {
  private readonly logger = new Logger(WeaponsController.name);

  constructor(private readonly weaponsService: WeaponsService) {}

  @Get('weapons')
  async findAll(
    @Query('type') type: weaponTypeE,
    @Query('limit') limit: number
  ): Promise<Weapon[]> {
    if (limit && isNaN(limit)) {
      throw new HttpException('Limit param should be a number', HttpStatus.BAD_REQUEST)
    }

    const weapons = await this.weaponsService.findAll(type, limit);

    if (weapons.length === 0) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
    }

    return weapons;
  }

  // There is no enum implementation, need another approach. Maybe pipe.

  @Get('weapons/:id')
  async getWeaponById(@Param('id') id: number): Promise<Weapon> {
    const weapon = await this.weaponsService.findOne(id);
    if (!weapon) {
      throw new HttpException('Weapon not found', HttpStatus.NOT_FOUND);
    }
    return weapon;
  }

  @Post('weapons')
  async createWeapon(@Body() weaponsData: weaponData[]): Promise<Weapon[]> {
    try {
      const newWeapons = await this.weaponsService.createMany(weaponsData);
      return newWeapons;
    } catch (error) {
      this.logger.error('Error occurred while creating weapons', error.stack);
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
