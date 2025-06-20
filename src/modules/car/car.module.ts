import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from './car.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarEntity]),
  ],
  controllers: [CarController],
  providers: [CarService]
})
export class CarModule {}
