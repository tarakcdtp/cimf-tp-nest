import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { CarModule } from './modules/car/car.module';

@Module({
  imports: [UserModule, CarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
