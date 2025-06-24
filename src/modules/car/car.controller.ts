import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { Car } from './car.interface';
import { CardtoDto } from './cardto.dto';
import { CarService } from './car.service';

@Controller('car')
export class CarController {
    
  constructor(private readonly carService: CarService) {}

  @Get()
  getAllCars() {
    return this.carService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: number) {
    return this.carService.findById(id);
  }

  @Post()
  createCar(@Body() carData: CardtoDto) {
    return this.carService.create(carData);
  }

  @Put(':id')
  updateCar(@Param('id', ParseIntPipe) id: number, @Body() updateData: CardtoDto) {
    return this.carService.update(id, updateData);
  }

  @Patch(':id')
  patchCar(@Param('id', ParseIntPipe) id: number, @Body() updateData: CardtoDto) {
    return this.carService.patch(id, updateData);
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number) {
    return this.carService.delete(id);
  }
}
