import { Body, Controller, Get, Post } from '@nestjs/common';
import { TalismansService } from './talismans.service';
import { Talisman } from './talisman.entity';
import { talismanData } from './talisman.interface';

@Controller()
export class TalismansController {
  constructor(private readonly talismansService: TalismansService) {}

  @Get('talismans')
  async getTalismans(): Promise<Talisman[]> {
    return this.talismansService.findAll();
  }

  @Get('talismans/:id')
  getTalisman(id: number): Promise<Talisman> {
    return this.talismansService.findOne(id)
  }

  @Post('talismans')
  async createTalisman(@Body() talismanData: talismanData): Promise<Talisman> {
    return await this.talismansService.create(talismanData)
  }
}
