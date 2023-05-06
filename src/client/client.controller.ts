/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './create-client.dto';

@Controller('client')
export class ClientController {
    /* 
        private clientService;
        constructor(clientService: ClientService) {
            this.clientService = clientService;
        } 
    */

  // above constructor is same as below
  constructor(private clientService: ClientService) { };

  @Get('/all')
  getAllClients() {
    return this.clientService.getAllClients();
  }

  @Get('/{clientId}')
  getClientById(@Param() clientId: number) {
    return this.clientService.getClientById(clientId);
  }

  @Post()
  createNewClient(@Body() createClientDto: CreateClientDto) {
    return this.clientService.createNewClient(createClientDto);
  }
}
