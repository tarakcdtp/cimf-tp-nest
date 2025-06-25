import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user')
export class UserController {
   
  @Roles('admin')
  @Get('admin')
  getProfileAdmin(@Req() request) {
    console.log(request.user);
    return { message: `Accès autorisé à l’utilisateur authentifié : ${request.user.email}` };
  }

  @Roles('user')
  @Get('user')
  getProfileUser(@Req() request) {
    console.log(request.test.test);//
    return { message: `Accès autorisé à l’utilisateur authentifié : ${request.user.email}` };
  }
}
