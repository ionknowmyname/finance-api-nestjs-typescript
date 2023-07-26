/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtGuard } from '../auth/guard/jwt.guard';
// import { ClientService } from './client.service';
// import { CreateClientDto } from './create-client.dto';
// import { IsNumberString } from 'class-validator';
// import { ClientResponseDto } from './client-response.dto';

@Controller('transaction')
@UseGuards(JwtGuard)
export class TransactionController {

  constructor(private transactionService: TransactionService) {};

  // @UseGuards(AuthGuard('jwt'))
  // @UseGuards(JwtGuard)
  @Get('/all')
  async getAllClients(@Req() req: Request) {

    console.log({
        user: req.user,
    });
    

    return "testing 12345678"
  }

//   @Get('/:clientId')
//   async getClientById(@Param('clientId', ParseIntPipe) clientId: number): Promise<ClientResponseDto> {
//     return this.clientService.getClientById(clientId);
//   }

//   @Post()
//   async createNewClient(@Body() createClientDto: CreateClientDto): Promise<ClientResponseDto> {
//     return this.clientService.createNewClient(createClientDto);
//   }

//   @Put('/:clientId/activate')
//   async activateClientById(@Param('clientId', ParseIntPipe) clientId: number): Promise<ClientResponseDto> {
//     return this.clientService.activateClientById(clientId);
//   }
}
