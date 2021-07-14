import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import AuthService from '../services/auth.service';
import JwtGuard from '../guards/jwt.guard';
import LocalGuard from '../guards/local.guard';

@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto) {
    return this.authService.login(dto);
  }

  @Post('reg')
  async register(@Body() dto) {
    return this.authService.register(dto);
  }

  @UseGuards(JwtGuard)
  @Get('success')
  async getSuccess() {
    return {
      message: 'Ураааа!',
    };
  }
}
