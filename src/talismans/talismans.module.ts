import { Module } from '@nestjs/common';
import { TalismansController } from './talismans.controller';
import { TalismansService } from './talismans.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Talisman } from './talisman.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Talisman])],
  controllers: [TalismansController],
  providers: [TalismansService]
})
export class TalismansModule {}
