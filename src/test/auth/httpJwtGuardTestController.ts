import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtHttpAuthenticationGuard } from '../../auth';

@Controller('users')
export class HttpJwtGuardTestController {
  @UseGuards(JwtHttpAuthenticationGuard)
  @Get()
  get(@Request() req: any) {
    return req.user;
  }
}
