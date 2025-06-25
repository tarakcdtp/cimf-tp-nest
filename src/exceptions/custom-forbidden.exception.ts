import { ForbiddenException, HttpStatus } from '@nestjs/common';

export class CustomForbiddenException extends ForbiddenException {
  private readonly errorCode: number;

  constructor(message?: string, errorCode = 40301) {
    // Message personnalisé ou message par défaut
    super(message || 'Accès refusé');
    this.errorCode = errorCode;
  }

  // On modifie la réponse JSON envoyée au client
  getResponse() {
    return {
      statusCode: HttpStatus.FORBIDDEN,
      error: 'Forbidden',
      message: this.message || 'Message par défaut',
      errorCode: this.errorCode,  // code métier spécifique
      timestamp: new Date().toISOString(),
    };
  }
}
