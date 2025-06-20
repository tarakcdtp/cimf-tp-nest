import { Injectable, NotFoundException } from '@nestjs/common';
import { CardtoDto } from './cardto.dto';
import { Car } from './car.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarEntity } from './car.entity';

@Injectable()
export class CarService {
    
  constructor(
    @InjectRepository(CarEntity)
    private readonly carRepository: Repository<CarEntity>,
  ) {}

  async create(carDto: CardtoDto): Promise<CarEntity> {
    const newCar = this.carRepository.create(carDto);
    return await this.carRepository.save(newCar);           
  }

  async findAll(): Promise<CarEntity[]> {
    return await this.carRepository.find();
  }

  async findById(id: number): Promise<CarEntity> {
    const car = await this.carRepository.findOneBy({ id });
    if (!car) throw new NotFoundException('Aucune voiture disponible !');
    return car;
  }

  async update(id: number, updateDto: CardtoDto): Promise<CarEntity> {
    const car = await this.findById(id);
    Object.assign(car, updateDto);
    return await this.carRepository.save(car);
  }

  async patch(id: number, updateDto: Partial<CardtoDto>): Promise<CarEntity> {
    const car = await this.findById(id);
    Object.assign(car, updateDto);
    return await this.carRepository.save(car);
  }

  async delete(id: number): Promise<CarEntity> {
    const car = await this.findById(id);
    await this.carRepository.remove(car);
    return car;
  }
}
