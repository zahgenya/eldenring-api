import { Module } from '@nestjs/common';
import { ArmorsService } from './armors.service';
import { ArmorsController } from './armors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Armor } from './armor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Armor])],
  providers: [ArmorsService],
  controllers: [ArmorsController]
})
export class ArmorsModule {}
