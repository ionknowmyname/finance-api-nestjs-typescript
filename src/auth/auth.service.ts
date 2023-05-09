/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { LoginRequestDto } from './login-request.dto';
import { LoginResponseDto } from './login-response.dto';

@Injectable()
export class AuthService {
  async loginClient(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    throw new Error('Method not implemented.');
  }
}
