import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthenticationGuard } from '../../auth';

@Controller('auth/google')
export class GoogleTestController {
  @UseGuards(GoogleAuthenticationGuard)
  @Get()
  auth() {}

  @UseGuards(GoogleAuthenticationGuard)
  @Get('redirect')
  authCallback(@Req() req: { user: any }){
    return req.user;
  }
}
