import { Module } from '@nestjs/common';
import { AshesService } from './ashes.service';
import { AshesController } from './ashes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ash } from './ash.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ash])],
  providers: [AshesService],
  controllers: [AshesController]
})
export class AshesModule {}
