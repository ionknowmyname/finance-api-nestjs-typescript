/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class TransactionService {

  constructor(
    @InjectRepository(Transaction)
    private clientRepository: Repository<Transaction>
  ) {}

}