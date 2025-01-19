import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshTokenAuthGuard } from './guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user.userId, req.user.login);
  }

  @UseGuards(RefreshTokenAuthGuard)
  @Post('refresh')
  refresh(@Request() req) {
    console.count('refresh');
    return this.authService.refreshTokens(req.user.id, req.user.login);
  }
}
