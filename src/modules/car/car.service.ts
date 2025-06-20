import { Injectable, NotFoundException } from '@nestjs/common';
import { CardtoDto } from './cardto.dto';
import { Car } from './car.interface';

@Injectable()
export class CarService {
    private cars: Car[] = [];
  private idSeq = 1;

  create(carDto: CardtoDto): Car {
    const newCar: Car = { ...carDto, id: this.idSeq++ };
    this.cars.push(newCar);
    return newCar;
  }

  findAll(): Car[] {
    return this.cars;
  }

  findById(id: number): Car {
    const car = this.cars.find(c => c.id === id);
    if (!car) throw new NotFoundException('Aucune voiture disponible !');
    return car;
  }

  update(id: number, updateDto: CardtoDto): Car {
    const carIndex = this.cars.findIndex(car => car.id === id);
    if (carIndex === -1) throw new NotFoundException('Aucune voiture disponible !')

    this.cars[carIndex] = { ...updateDto, id };
    return this.cars[carIndex];
  }


  patch(id: number, updateDto: CardtoDto): Car {
    const carIndex = this.cars.findIndex(car => car.id === id);
    if (carIndex === -1) throw new NotFoundException('Aucune voiture disponible !')

    this.cars[carIndex] = { ...this.cars[carIndex], ...updateDto };
    return this.cars[carIndex];
  }



  delete(id: number): Car {
    const carIndex = this.cars.findIndex(c => c.id === id);
    if (carIndex === -1) throw new NotFoundException('Aucune voiture disponible !');
    const [deleted] = this.cars.splice(carIndex, 1);
    return deleted;
  }
}
