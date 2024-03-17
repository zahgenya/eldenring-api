import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weapon } from './weapons/weapon.entity';
import { WeaponsModule } from './weapons/weapons.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:3306,
      username:'root',
      password:'root',
      database:'eldenDB',
      entities:[Weapon],
      synchronize: true,
    }),
    WeaponsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
