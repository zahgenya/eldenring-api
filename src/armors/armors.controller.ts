import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ArmorsService } from './armors.service';
import { Armor } from './armor.entity'
import { armorData } from './armor.interface';

@Controller()
export class ArmorsController {
  constructor (private readonly armorsService: ArmorsService) {}

  @Get('armors')
  getArmors(): Promise<Armor[]> {
    return this.armorsService.findAll();
  }

  @Get('armors/:id')
  getArmorById(@Param('id') id: number): Promise<Armor> {
    return this.armorsService.findOne(id);
  }

  @Post('armors')
  async createArmor(@Body() armorData: armorData): Promise<Armor> {
    return await this.armorsService.create(armorData);
  }
}
