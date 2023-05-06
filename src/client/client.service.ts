/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './create-client.dto';

@Injectable()
export class ClientService {

  createNewClient(createClientDto: CreateClientDto) {
    return { testing: 'testing' };
  }

  getClientById(clientId: number) {
    return { testing: 'testing' };
  }

  getAllClients() {
    return { testing: 'testing' };
  }
}
