import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { CarModule } from './modules/car/car.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import * as winston from 'winston';
import { transports } from 'winston';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { NotFoundExceptionFilter } from './exceptions/notfound-filter.exception';

const transportsConfig: winston.transport[] = [
  new DailyRotateFile({
    // %DATE will be replaced by the current date
    filename: `logs/%DATE%-error.log`,
    level: 'error',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.ms(),
      nestWinstonModuleUtilities.format.nestLike('MizaniaLogger', {
        colors: true,
        prettyPrint: true,
      }),
    ),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: false, // don't want to zip our logs
    maxFiles: '30d', // will keep log until they are older than 30 days
  }),
  new DailyRotateFile({
    level: 'verbose',
    filename: `logs/%DATE%-combined.log`,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.ms(),
      nestWinstonModuleUtilities.format.nestLike('MizaniaLogger', {
        colors: true,
        prettyPrint: true,
      }),
    ),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: false,
    maxFiles: '30d',
  }),
  new transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.ms(),
      nestWinstonModuleUtilities.format.nestLike('MizaniaConsole', {
        colors: true,
        prettyPrint: true,
      }),
    ),
  }),
  // Add more transports as needed
];
export const winstonConfig: winston.LoggerOptions = {
  transports: transportsConfig,
};

@Module({
  imports: [
    UserModule, 
    CarModule,
    WinstonModule.forRoot(winstonConfig),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: '08863180',
      database: 'cimf_db_1',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, NotFoundExceptionFilter],
})
export class AppModule {}
