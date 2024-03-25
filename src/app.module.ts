import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './auth/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Weapon } from './weapons/weapon.entity';
import { WeaponsModule } from './weapons/weapons.module';
import { TalismansModule } from './talismans/talismans.module';
import { Talisman } from './talismans/talisman.entity';
import { SpellsModule } from './spells/spells.module';
import { Spell } from './spells/spell.entity';
import { AshesModule } from './ashes/ashes.module';
import { Ash } from './ashes/ash.entity';
import { ArmorsModule } from './armors/armors.module';
import { Armor } from './armors/armor.entity';

  @Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type:'postgres',
      host: process.env.HOST,
      port: parseInt(process.env.PORT, 10),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities:[Weapon, Talisman, Spell, Ash, Armor],
      synchronize: true,
    }),
    WeaponsModule,
    TalismansModule,
    SpellsModule,
    AshesModule,
    ArmorsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}
