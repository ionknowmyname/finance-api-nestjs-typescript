/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto } from './login-request.dto';
import { LoginResponseDto } from './login-response.dto';
import { ClientService } from 'src/client/client.service';
import { JwtService } from '@nestjs/jwt';
import { Client } from 'src/client/client.entity';
import { ConfigService } from '@nestjs/config';
const bcrypt = import("bcrypt-ts");

@Injectable()
export class AuthService {

  constructor(private clientService: ClientService, private jwt: JwtService, private config: ConfigService) {};

  
  async loginClient(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    
    const foundClient = await this.clientService.getClientByEmail(loginDto.email);

    if(foundClient) {
      // compare passwords
      const isMatch = (await bcrypt).compareSync(loginDto.password, foundClient.password);

      if(isMatch) {
        // generate token 
        const responseDto = new LoginResponseDto();

        const token = await this.createJwtToken(foundClient);

        responseDto.clientId = foundClient.id;
        responseDto.clientEmail = foundClient.email;
        responseDto.access_token = token;
        // responseDto.refresh_token = ;
        // responseDto.expiresIn = ;

        return responseDto;

      } else throw new UnauthorizedException(`Wrong password`);

    } else throw new UnauthorizedException(`Client with email ${loginDto.email} not found`);
  }


  // create jwt for the whole client
  createJwtToken(client: Client): Promise<string> {
    return this.jwt.signAsync({ client }, { expiresIn: '30m', secret: this.config.get('JWT_SECRET')})
  }
}
