/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './create-client.dto';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientResponseDto } from './client-response.dto';
// import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";
// import * as bcrypt from "bcrypt-ts";
const bcrypt = import("bcrypt-ts");


@Injectable()
export class ClientService {

  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>
  ) {}


  async createNewClient(createClientDto: CreateClientDto): Promise<ClientResponseDto> {
    
    const foundClient = await this.clientRepository.findOne({ where: { email: createClientDto.email } });
    
    if(foundClient) throw new Error(`Client with email ${createClientDto.email} already exists`);

    // hash password
    const salt = (await bcrypt).genSaltSync(10);
    const hashedPassword = (await bcrypt).hashSync(createClientDto.password, salt);
    createClientDto.password = hashedPassword;

    const clientToSave = this.dtoToEntity(createClientDto);

    const savedClient = await this.clientRepository.save(clientToSave);

    const responseDto = this.entityToDto(savedClient);

    return responseDto;
  }

  async getClientById(clientId: number): Promise<ClientResponseDto | null> {
    // return this.clientRepository.findOneBy({ id: clientId, });

    const foundClient = await this.clientRepository.findOne({ where: { id: clientId } });

    if(foundClient) {  // convert to dto
      const responseDto = this.entityToDto(foundClient);

      return responseDto;

    } else throw new Error(`Client with id ${clientId} not found`);
  }

  async getAllClients(): Promise<ClientResponseDto[]> {
    const clientList = await this.clientRepository.find();
    // const responseDto = [];
    // clientList.forEach(client => {
    //   const dto = this.entityToDto(client);
    //   responseDto.push(dto);
    // });

    // return responseDto;

    console.log('ClientList: ', clientList);
    

    return clientList.map(client => { 
      return this.entityToDto(client) 
    });
  }

  async activateClientById(clientId: number): Promise<ClientResponseDto | null> {
    // return this.clientRepository.findOneBy({ id: clientId, });

    const foundClient = await this.clientRepository.findOne({ where: { id: clientId } });

    if(foundClient) {  

      // update isActive to true

      /* 
        const ans = await this.clientRepository.update({ id: clientId }, { isActive: true });
        console.log("ans --> ", ans);
        console.log("ans.raw --> ", ans.raw); 
      */

      foundClient.isActive = true;
      const updatedClient = await this.clientRepository.save(foundClient);
      
      const responseDto = this.entityToDto(updatedClient);

      return responseDto;

    } else throw new Error(`Client with id ${clientId} not found`);
  }


  entityToDto(entity: Client): ClientResponseDto {
    const dto = new ClientResponseDto();

    dto.id = entity.id;
    dto.name = entity.name;
    dto.email = entity.email;
    dto.phonenumber = entity.phonenumber;
    // dto.password = entity.password;
    dto.isActive = entity.isActive;

    return dto;
  }

  dtoToEntity(dto: CreateClientDto): Client {
    const entity = new Client();

    entity.name = dto.name;
    entity.email = dto.email;
    entity.phonenumber = dto.phonenumber;
    entity.password = dto.password;

    return entity;
  }
}
