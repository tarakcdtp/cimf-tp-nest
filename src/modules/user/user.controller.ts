import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
   @UseGuards(JwtAuthGuard)
  @Get()
  getProfile() {
    return { message: 'Accès autorisé à l’utilisateur authentifié' };
  }
}
