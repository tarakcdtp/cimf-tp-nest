import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotFoundException,
  HttpStatus,
  Inject,
  Logger,
  Injectable,
} from '@nestjs/common';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {

    constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) { }

  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    this.logger.log(`Got 404 path : ${request.url}`, NotFoundExceptionFilter.name);
    this.logger.debug(`Got 404 path : ${request.url}`, NotFoundExceptionFilter.name);
    this.logger.verbose(`Got 404 path : ${request.url}`, NotFoundExceptionFilter.name);
    this.logger.warn(`Got 404 path : ${request.url}`, NotFoundExceptionFilter.name);
    this.logger.error(`Got 404 path : ${request.url}`, NotFoundExceptionFilter.name);


    response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      error: 'Not Found',
      message: 'Resource not found',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}