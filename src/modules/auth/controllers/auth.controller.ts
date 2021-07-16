import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import AuthService from '../services/auth.service';
import JwtGuard from '../guards/jwt.guard';
import { hasRoles } from '../decorators/roles.decorator';
import { UserRole } from '../../user/interfaces/UserRoleInterface';
import RolesGuard from '../guards/roles.guard';

@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto) {
    return this.authService.login(dto);
  }

  @Post('reg')
  register(@Body() dto) {
    return this.authService.register(dto);
  }

  @UseGuards(JwtGuard)
  @Get('success')
  getSuccess(@Request() req) {
    console.log(req.user);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @hasRoles(UserRole.ADMIN)
  @Get('success-role')
  getSuccessRole(@Request() req) {
    console.log(req.user);
  }

  @UseGuards(JwtGuard)
  @Get('test')
  testFunc(@Request() req) {
    const { username, password } = req.user;
    return this.authService.validateUserWithPassword({ username, password });
  }
}
