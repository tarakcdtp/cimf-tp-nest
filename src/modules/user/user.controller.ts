import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
   @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Req() request) {
    console.log(request.user);
    return { message: `Accès autorisé à l’utilisateur authentifié : ${request.user.email}` };
  }
}
