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
import { ConfigModule, ConfigService } from '@nestjs/config';

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
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
    }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, NotFoundExceptionFilter],
})
export class AppModule {}
