/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto } from './login-request.dto.js';
import { LoginResponseDto } from './login-response.dto.js';
import { ClientService } from '../client/client.service.js';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
// import { compareSync } from 'bcrypt-ts';
// const bcrypt = import("bcrypt-ts");

import * as argon2 from "argon2";


@Injectable()
export class AuthService {

  constructor(private clientService: ClientService, private jwt: JwtService, private config: ConfigService) {};

  
  async loginClient(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    
    const foundClient = await this.clientService.getClientByEmail(loginDto.email);

    if(foundClient) {
      // compare passwords
      // const isMatch = (await bcrypt).compareSync(loginDto.password, foundClient.password);
      // const isMatch = compareSync(loginDto.password, foundClient.password);

      const isMatch = await argon2.verify(foundClient.password, loginDto.password);

      if(isMatch) {
        // generate token 
        const responseDto = new LoginResponseDto();

        const { password, ...clientWithoutPassword } = foundClient;

        const token = await this.createJwtToken(clientWithoutPassword);

        responseDto.clientId = foundClient.id;
        responseDto.clientEmail = foundClient.email;
        responseDto.access_token = token;
        // responseDto.refresh_token = ;
        // responseDto.expiresIn = ;

        return responseDto;

      } else throw new UnauthorizedException(`Wrong password`);

    } else throw new UnauthorizedException(`Client with email ${loginDto.email} not found`);
  }


  // // create jwt for the whole client
  // createJwtToken(client: Client): Promise<string> {
  //   return this.jwt.signAsync({ client }, { expiresIn: '30m', secret: this.config.get('JWT_SECRET')})
  // }

  // create jwt for the whole client minus password
  createJwtToken(client: any): Promise<string> {
    return this.jwt.signAsync({ client }, { expiresIn: '30m', secret: this.config.get('JWT_SECRET')})
  }
}
