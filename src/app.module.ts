import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weapon } from './weapons/weapon.entity';
import { WeaponsModule } from './weapons/weapons.module';
import { TalismansModule } from './talismans/talismans.module';
import { Talisman } from './talismans/talisman.entity';
import { SpellsModule } from './spells/spells.module';
import { Spell } from './spells/spell.entity';
import { AshesModule } from './ashes/ashes.module';
import { Ash } from './ashes/ash.entity';

  @Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:3306,
      username:'root',
      password:'root',
      database:'eldenDB',
      entities:[Weapon, Talisman, Spell, Ash],
      synchronize: true,
    }),
    WeaponsModule,
    TalismansModule,
    SpellsModule,
    AshesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
