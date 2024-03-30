import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ArmorsService } from './armors.service';
import { Armor } from './armor.entity';
import { armorData } from './armor.interface';

@Controller()
export class ArmorsController {
  constructor(private readonly armorsService: ArmorsService) {}

  @Get('armors')
  async getArmors(
    @Query('limit') limit: number
  ): Promise<Armor[]> {
    if (limit && isNaN(limit)) {
      throw new HttpException('Limit param should be a number', HttpStatus.BAD_REQUEST)
    }

    const armors = await this.armorsService.findAll(limit);

    if (armors.length === 0) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return armors;
  }

  @Get('armors/:id')
  async getArmorById(@Param('id') id: number): Promise<Armor> {
    const armor = await this.armorsService.findOne(id);
    if (!armor) {
      throw new HttpException('Armor not found', HttpStatus.NOT_FOUND);
    }
    return armor;
  }

  @Post('armors')
  async createArmor(@Body() armorData: armorData): Promise<Armor> {
    try {
      const newArmor = await this.armorsService.create(armorData);
      return newArmor;
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
