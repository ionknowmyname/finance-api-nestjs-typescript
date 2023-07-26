/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginRequestDto } from './login-request.dto';
import { LoginResponseDto } from './login-response.dto';

@Controller('auth')
export class AuthController {
  
  constructor(private authService: AuthService) {};

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.loginClient(loginDto);
  }
}
