import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { Car } from './car.interface';

@Controller('car')
export class CarController {
    private cars: Car[] = []; 
    private idSeq: number = 1;

  @Get()
  getAllCars() {
    return this.cars;
  }

  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: number) {
    let car = this.cars.find(car => car.id === id);
    if (!car) {
        throw new NotFoundException('Aucune voiture disponible !')
    }
    return car;
  }

  @Post()
  createCar(@Body() carData: Car) {
    const newCar = { ...carData, id: this.idSeq };
    this.idSeq ++;
    this.cars.push(newCar);
    return newCar;
  }

  @Put(':id')
  updateCar(@Param('id', ParseIntPipe) id: number, @Body() updateData: Car) {
    const carIndex = this.cars.findIndex(car => car.id === id);
    if (carIndex === -1) throw new NotFoundException('Aucune voiture disponible !')

    this.cars[carIndex] = { ...updateData, id };
    return this.cars[carIndex];
  }

  @Patch(':id')
  patchCar(@Param('id', ParseIntPipe) id: number, @Body() updateData: Car) {
    const carIndex = this.cars.findIndex(car => car.id === id);
    if (carIndex === -1) throw new NotFoundException('Aucune voiture disponible !')

    this.cars[carIndex] = { ...this.cars[carIndex], ...updateData };
    return this.cars[carIndex];
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number) {
    const carIndex = this.cars.findIndex(car => car.id === id);
    if (carIndex === -1) throw new NotFoundException('Aucune voiture disponible !')

    const deleted = this.cars.splice(carIndex, 1);
    return { message: 'Deleted', car: deleted[0] };
  }
}
