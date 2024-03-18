import { Module } from '@nestjs/common';
import { SpellsService } from './spells.service';
import { SpellsController } from './spells.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Spell } from './spell.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Spell])],
  providers: [SpellsService],
  controllers: [SpellsController]
})
export class SpellsModule {}
