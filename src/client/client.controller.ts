/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './create-client.dto';
import { IsNumberString } from 'class-validator';
import { ClientResponseDto } from './client-response.dto';

@Controller('client')
export class ClientController {
    /* 
        private clientService;
        constructor(clientService: ClientService) {
            this.clientService = clientService;
        } 
    */

  // above constructor is same as below
  constructor(private clientService: ClientService) {};

  @Get('/all')
  async getAllClients(): Promise<ClientResponseDto[]> {
    return this.clientService.getAllClients();
  }

  @Get('/:clientId')
  async getClientById(@Param('clientId', ParseIntPipe) clientId: number): Promise<ClientResponseDto> {
    return this.clientService.getClientById(clientId);
  }

  @Post()
  async createNewClient(@Body() createClientDto: CreateClientDto): Promise<ClientResponseDto> {
    return this.clientService.createNewClient(createClientDto);
  }

  @Put('/:clientId/activate')
  async activateClientById(@Param('clientId', ParseIntPipe) clientId: number): Promise<ClientResponseDto> {
    return this.clientService.activateClientById(clientId);
  }
}
